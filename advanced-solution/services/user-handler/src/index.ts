import "dotenv-defaults/config";

import {error, log} from "@http-notifs/logger";
import {createRedisClient, PREFIXES} from "@http-notifs/redis-client";
import {
  linkConfirmationValidation,
  signInValidation,
  signUpValidation,
  webHookValidation,
} from "@http-notifs/validation";
import bcrypt from "bcryptjs";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import ms from "ms";
import {v4 as uuid} from "uuid";

import {
  AUTHENTICATION_ERROR,
  EMAIL_EXISTS,
  INVALID_LINK,
  VALIDATION_ERROR,
} from "./constants";
import getFrom from "./utils/getFrom";
import mss from "./utils/mss";
import sendEmailConfirmation from "./utils/sendEmailConfirmation";

async function start() {
  const RedisStore = connectRedis(session);
  const redis = createRedisClient();

  const app = express();

  app.use(express.json());

  app.use(
    session({
      store: new RedisStore({client: redis as any}),
      saveUninitialized: true,
      secret: process.env.COOKIE_SECRET as string,
      resave: false,
      name: "sid",
      genid() {
        return uuid();
      },
      cookie: {
        maxAge: ms("7d"),
      },
    }),
  );

  /**
   * Auth routes
   */
  app.post("/auth/email-login", async (req, res) => {
    log(getFrom(req), "user logging");

    let valid = await signInValidation.isValid(req.body);
    if (!valid) return res.json({error: VALIDATION_ERROR});

    const userId = await redis.get(`${PREFIXES.EMAIL}:${req.body.email}`);
    if (!userId) return res.json({error: AUTHENTICATION_ERROR});

    const user = JSON.parse(
      (await redis.get(`${PREFIXES.USER}:${userId}`)) as string,
    );

    valid = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!valid) return res.json({error: AUTHENTICATION_ERROR});

    const sessionUser = {id: userId, email: user.email};

    (req.session as any).user = sessionUser;

    res.json({data: sessionUser});
  });

  app.post("/auth/email-register", async (req, res) => {
    log(getFrom(req), "user registering");

    const valid = await signUpValidation.isValid(req.body);

    if (!valid) {
      log(getFrom(req), req.body, "not passed validation");
      return res.json({error: VALIDATION_ERROR});
    }

    const exists = await redis.get(`${PREFIXES.EMAIL}:${req.body.email}`);
    if (exists) return res.json({error: EMAIL_EXISTS});

    const passwordHash = await bcrypt.hash(
      req.body.password,
      +(<string>process.env.BCRYPT_SALT),
    );

    const emailConfirmationId = uuid();

    await redis.set(
      `${PREFIXES.EMAIL_CONFIRMATION}:${emailConfirmationId}`,
      JSON.stringify({
        email: req.body.email,
        sessionId: req.session.id,
        passwordHash,
      }),
      "EX",
      mss("1h"),
    );

    await sendEmailConfirmation({
      email: req.body.email,
      token: emailConfirmationId,
    });

    res.json({
      data: "ok",
    });
  });

  app.post("/auth/logout", (req, res) => {
    log(getFrom(req), "logging out");

    req.session.destroy(() => {
      res.json({data: "ok"});
    });
  });

  app.get("/auth/me", (req, res) => {
    log(getFrom(req), req.session, "me");

    if ((req.session as any).user) res.json({data: (req.session as any).user});
    else res.json({error: AUTHENTICATION_ERROR});
  });

  app.post("/auth/email-confirm", async (req, res) => {
    log(getFrom(req), "confirming email");

    const valid = linkConfirmationValidation.isValid(req.body);
    if (!valid) {
      log(getFrom(req), req.body, "not passed validation");
      return res.json({error: VALIDATION_ERROR});
    }

    const userData = await redis.get(
      `${PREFIXES.EMAIL_CONFIRMATION}:${req.body.id}`,
    );

    if (!userData) return res.json({error: INVALID_LINK});

    await redis.del(`${PREFIXES.EMAIL_CONFIRMATION}:${req.body.id}`);

    const debotConfirmationId = uuid();

    await redis.set(
      `${PREFIXES.DEBOT_CONFIRMATION}:${debotConfirmationId}`,
      userData,
      "EX",
      mss("1h"),
    );

    res.json({data: {token: debotConfirmationId}});
  });

  /**
   * Webhook routes
   */
  app.post("/webhooks/create", async (req, res) => {
    log(getFrom(req), "creating webhook");

    if (!(req.session as any).user) {
      log(getFrom(req), "unauthenticated");
      return res.json({error: AUTHENTICATION_ERROR});
    }

    const valid = webHookValidation.isValid(req.body);
    if (!valid) {
      log(getFrom(req), req.body, "not passed validation");
      return res.json({error: VALIDATION_ERROR});
    }

    const confirmationToken = uuid();

    await redis.hset(
      `${PREFIXES.PENDING_WEBHOOKS}:${(req.user as any).id}`,
      req.body.webUrl,
      JSON.stringify({
        iterations: 0,
        confirmationToken,
      }),
    );

    const now = Date.now();

    await redis.zadd(
      PREFIXES.PENDING_WEBHOOKS,
      now,
      `${(req.user as any).id}:${req.body.webUrl}`,
    );

    res.json({
      data: "ok",
    });
  });

  app.delete("/webhooks/delete", async (req, res) => {
    log(getFrom(req), "deleting webhook");

    if (!(req.session as any).user) {
      log(getFrom(req), "unauthenticated");
      return res.json({error: AUTHENTICATION_ERROR});
    }

    const valid = webHookValidation.isValid(req.body);
    if (!valid) {
      log(getFrom(req), req.body, "not passed validation");
      return res.json({error: VALIDATION_ERROR});
    }

    await redis.zrem(
      PREFIXES.PENDING_WEBHOOKS,
      `${(req.user as any).id}:${req.body.webUrl}`,
    );

    await redis.hdel(
      `${PREFIXES.PENDING_WEBHOOKS}:${(req.user as any).id}`,
      req.body.webUrl,
    );

    await redis.srem(
      `${PREFIXES.VALID_WEBHOOKS}:${(req.user as any).id}`,
      req.body.webUrl,
    );

    await redis.hdel(
      `${PREFIXES.FAILED_WEBHOOKS}:${(req.user as any).id}`,
      req.body.webUrl,
    );

    res.json({
      data: "ok",
    });
  });

  app.get("/webhooks", async (req, res) => {
    log(getFrom(req), "fetching webhooks");

    if (!(req.session as any).user) {
      log(getFrom(req), "unauthenticated");
      return res.json({error: AUTHENTICATION_ERROR});
    }

    const pending = await redis.hgetall(
      `${PREFIXES.PENDING_WEBHOOKS}:${(req.user as any).id}`,
    );
    const valid = await redis.smembers(
      `${PREFIXES.VALID_WEBHOOKS}:${(req.user as any).id}`,
    );
    const failed = await redis.hgetall(
      `${PREFIXES.FAILED_WEBHOOKS}:${(req.user as any).id}`,
    );

    return res.json({
      pending: Object.entries(pending).map(([key, value]) => ({
        ...JSON.parse(value),
        webUrl: key,
      })),
      valid: valid.map((webUrl) => ({webUrl})),
      failed: Object.entries(failed).map(([key, value]) => ({
        ...JSON.parse(value),
        webUrl: key,
      })),
    });
  });

  app.post("/webhooks/check-again", async (req, res) => {
    log(getFrom(req), "checking again webhooks");

    if (!(req.session as any).user) {
      log(getFrom(req), "unauthenticated");
      return res.json({error: AUTHENTICATION_ERROR});
    }

    const valid = webHookValidation.isValid(req.body);
    if (!valid) {
      log(getFrom(req), req.body, "not passed validation 1");
      return res.json({error: VALIDATION_ERROR});
    }

    const failed = await redis.hget(
      `${PREFIXES.FAILED_WEBHOOKS}:${(req.user as any).id}`,
      req.body.webUrl,
    );

    if (!failed) {
      log(getFrom(req), req.body, "not passed validation 2");
      return res.json({error: VALIDATION_ERROR});
    }

    redis.hdel(
      `${PREFIXES.FAILED_WEBHOOKS}:${(req.user as any).id}`,
      req.body.webUrl,
    );

    redis.hset(
      `${PREFIXES.FAILED_WEBHOOKS}:${(req.user as any).id}`,
      req.body.webUrl,
      JSON.stringify({
        ...JSON.parse(failed),
        iterations: 0,
      }),
    );

    const now = Date.now();

    await redis.zadd(
      PREFIXES.PENDING_WEBHOOKS,
      now,
      `${(req.user as any).id}:${req.body.webUrl}`,
    );

    res.json({
      data: "ok",
    });
  });

  app.listen(
    +(<string>process.env.BACKEND_PORT),
    <string>process.env.BACKEND_HOST,
    () => {
      log(`Listening on port: ${process.env.BACKEND_PORT}`);
    },
  );
}

start();

process.on("unhandledRejection", (err) => {
  error(err);
  process.exit(1);
});
