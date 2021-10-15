import "dotenv-defaults/config";

import {error, log} from "@http-notifs/logger";
import {createRedisClient, PREFIXES} from "@http-notifs/redis-client";
import {promises} from "dns";
import ms from "ms";

import {DNS_VALIDATION_LIMIT} from "../constants";

const redis = createRedisClient();

const {resolveTxt} = promises;

setInterval(async () => {
  const [userIdWebUrl, timestamp] = await redis.zrange(
    PREFIXES.PENDING_WEBHOOKS,
    0,
    0,
    "WITHSCORES",
  );

  if (!userIdWebUrl || !timestamp || Date.now() < +timestamp) return;

  const [userId, webUrl] = userIdWebUrl.split(":");

  const webUrlDataStr = await redis.hget(
    `${PREFIXES.PENDING_WEBHOOKS}:${userId}`,
    webUrl,
  );

  if (!webUrlDataStr) {
    error(`no data for ${userId}`);
    return;
  }

  const webUrlData = JSON.parse(webUrlDataStr);

  const {hostname} = new URL(webUrl);
  const txtRecords = Array.prototype.flat.apply(await resolveTxt(hostname));

  if (txtRecords.includes(webUrlData.token)) {
    await redis.zrem(PREFIXES.PENDING_WEBHOOKS, `${userId}:${webUrl}`);

    await redis.hdel(`${PREFIXES.PENDING_WEBHOOKS}:${userId}`, webUrl);
    await redis.sadd(`${PREFIXES.VALID_WEBHOOKS}:${userId}`, webUrl);
  } else if (webUrlData.iterations > DNS_VALIDATION_LIMIT) {
    await redis.zrem(PREFIXES.PENDING_WEBHOOKS, `${userId}:${webUrl}`);

    await redis.hdel(`${PREFIXES.PENDING_WEBHOOKS}:${userId}`, webUrl);
    await redis.hset(
      `${PREFIXES.FAILED_WEBHOOKS}:${userId}`,
      webUrl,
      webUrlDataStr,
    );
  } else {
    await redis.zincrby(
      PREFIXES.PENDING_WEBHOOKS,
      ms("1m"),
      `${userId}:${webUrl}`,
    );

    await redis.hset(
      `${PREFIXES.FAILED_WEBHOOKS}:${userId}`,
      webUrl,
      JSON.stringify({
        ...webUrlData,
        iterations: webUrlData.iterations + 1,
      }),
    );
  }
}, ms("1s"));

log("dns-validation started validating");
