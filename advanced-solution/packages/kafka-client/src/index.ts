import dotenv from "dotenv-safe";
import {Consumer, Kafka} from "kafkajs";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../.env"),
  example: path.join(__dirname, "../.env.example"),
});

export async function createKafkaConsumer(groupId: string): Promise<Consumer> {
  const kafka = new Kafka({
    sasl: {
      mechanism: "scram-sha-512",
      username: <string>process.env.KAFKA_USERNAME,
      password: <string>process.env.KAFKA_PASSWORD,
    },
    brokers: [<string>process.env.KAFKA_URL],
  });

  const consumer = kafka.consumer({
    groupId,
  });

  await consumer.connect();
  await consumer.subscribe({
    topic: <string>process.env.KAFKA_TOPIC,
    fromBeginning: true,
  });

  return consumer;
}
