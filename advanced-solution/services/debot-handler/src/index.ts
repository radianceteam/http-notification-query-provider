import "dotenv-defaults/config";

import {error, log} from "@http-notifs/logger";
import {createRedisClient, PREFIXES} from "@http-notifs/redis-client";
import Fastify, {FastifyInstance, RouteShorthandOptions} from "fastify";
import FastifyFormbody from "fastify-formbody";

import {Body, BodyType, CredentialsType, Response, ResponseType} from "./types";

const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
  schema: {body: Body, response: {200: Response}},
};

server.register(FastifyFormbody);

const redis = createRedisClient();

server.post<{Body: BodyType; Reply: ResponseType}>(
  "/",
  opts,
  async (request, reply) => {
    const from = `${request.socket.remoteAddress}:${request.socket.remotePort}`;

    log(from, request.body);

    reply.raw.setHeader("Content-Type", "text/html");
    reply.raw.setHeader("Access-Control-Allow-Origin", "*");
    reply.raw.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );

    const {hash, data} = request.body;

    const credentials = await redis.get(
      `${PREFIXES.DEBOT_CONFIRMATION}:${Buffer.from(data, "base64").toString(
        "utf-8",
      )}`,
    );

    if (!credentials) {
      log(from, "no credentials");
      return "Your token is invalid. Please, try again to register on https://http-notifs.xyz/sign-up";
    }

    const {email, passwordHash, sessionId} = JSON.parse(
      credentials,
    ) as CredentialsType;

    await redis.set(
      `${PREFIXES.USER}:${hash}`,
      JSON.stringify({email, passwordHash}),
    );
    await redis.set(`${PREFIXES.EMAIL}:${email}`, hash);

    const session = await redis.get(`${PREFIXES.SESSION}:${sessionId}`);
    if (session) {
      redis.set(
        `${PREFIXES.SESSION}:${sessionId}`,
        JSON.stringify({
          ...JSON.parse(session),
          user: {
            id: hash,
            email,
          },
        }),
      );
    }

    await redis.del(`${PREFIXES.DEBOT_CONFIRMATION}:${data}`);

    log(from, "set credentials");

    return "You successfully registered in our system 🎉. Go to https://http-notifs.xyz/webhooks to create your first webhook";
  },
);

const start = async () => {
  try {
    await server.listen(
      +(<string>process.env.SERVER_PORT),
      process.env.SERVER_HOST,
    );
    log(`Listening on ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
  } catch (err) {
    error(err);
    process.exit(1);
  }
};
start();
