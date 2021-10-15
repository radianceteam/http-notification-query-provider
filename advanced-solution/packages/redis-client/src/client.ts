import dotenv from "dotenv";
import path from "path";
import Redis from "ioredis";
import {log} from "@http-notifs/logger";

const suffix =
  process.env.NODE_ENV === "production" ? "production" : "development";

dotenv.config({
  path: path.join(__dirname, `../.env.${suffix}`),
});

export default function createRedisClient() {
  log("new redis client with", {
    ENV: process.env.NODE_ENV,
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
  });

  const client = new Redis(+process.env.REDIS_PORT, process.env.REDIS_HOST);
  return client;
}
