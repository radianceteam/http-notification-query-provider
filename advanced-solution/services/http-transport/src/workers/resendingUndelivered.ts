import {error, log} from "@http-notifs/logger";
import {createRedisClient, PREFIXES} from "@http-notifs/redis-client";
import axios from "axios";
import ms from "ms";

import mss from "../utils/mss";

const redis = createRedisClient();

setInterval(async () => {
  const [keyUserIdWebUrl, timestamp] = await redis.zrange(
    PREFIXES.FAILED_MESSAGE,
    0,
    0,
    "WITHSCORES",
  );

  if (!keyUserIdWebUrl || !timestamp || Date.now() < +timestamp) return;

  const [key, userId, webUrl] = keyUserIdWebUrl.split(":");

  const value = await redis.get(
    `${PREFIXES.FAILED_MESSAGE}:${keyUserIdWebUrl}`,
  );

  if (!value) {
    await redis.zrem(PREFIXES.FAILED_MESSAGE, keyUserIdWebUrl);
    return;
  }

  const failedDelivery = async () => {
    await redis.zincrby(PREFIXES.FAILED_MESSAGE, ms("10m"), keyUserIdWebUrl);
  };

  try {
    const res = await axios.post(webUrl, value);

    if (res.status === 200) {
      await redis.set(
        `${PREFIXES.DELIVERED_MESSAGE}:${key}:${userId}:${webUrl}`,
        value,
        "EX",
        mss("1d"),
      );

      await redis.del(`${PREFIXES.FAILED_MESSAGE}:${key}:${userId}:${webUrl}`);
    } else {
      await failedDelivery();
    }
  } catch (err) {
    error(err);
    await failedDelivery();
  }
}, ms("1s"));

log("resender of undelivered");
