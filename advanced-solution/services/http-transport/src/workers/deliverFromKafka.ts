import {createKafkaConsumer} from "@http-notifs/kafka-client";
import {error, log} from "@http-notifs/logger";
import {createRedisClient, PREFIXES} from "@http-notifs/redis-client";
import axios from "axios";
import ms from "ms";

import mss from "../utils/mss";

async function start() {
  const kafka = await createKafkaConsumer("http-transport");
  const redis = createRedisClient();

  log("kafka started listening");

  kafka.run({
    async eachMessage(payload) {
      const key = payload.message.key.toString();
      const value = payload.message.value?.toString();

      if (!value) return;

      const [userId, ...rest] = value.split(" ");

      const webUrls = await redis.smembers(
        `${PREFIXES.VALID_WEBHOOKS}:${userId}`,
      );

      webUrls.forEach(async (webUrl) => {
        const exists = await redis.exists(
          `${PREFIXES.DELIVERED_MESSAGE}:${key}:${userId}:${webUrl}`,
        );

        if (exists) return;

        const deliveryFailed = async () => {
          await redis.set(
            `${PREFIXES.FAILED_MESSAGE}:${key}:${userId}:${webUrl}`,
            rest.join(" "),
            "EX",
            mss("1d"),
          );

          await redis.zadd(
            PREFIXES.FAILED_MESSAGE,
            Date.now() + ms("10m"),
            `${key}:${userId}:${webUrl}`,
          );
        };

        try {
          const res = await axios.post(webUrl, rest.join(" "));

          if (res.status !== 200) {
            await redis.set(
              `${PREFIXES.DELIVERED_MESSAGE}:${key}:${userId}:${webUrl}`,
              rest.join(" "),
              "EX",
              mss("1d"),
            );
          } else {
            await deliveryFailed();
          }
        } catch (err) {
          error(err);
          await deliveryFailed();
        }
      });
    },
  });
}

start();
