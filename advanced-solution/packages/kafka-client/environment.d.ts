declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KAFKA_URL: string;
      KAFKA_USERNAME: string;
      KAFKA_PASSWORD: string;
      KAFKA_TOPIC: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
