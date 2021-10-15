declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVICE: string;
      BACKEND_HOST: string;
      BACKEND_PORT: string;
      COOKIE_SECRET: string;
      BCRYPT_SALT: string;
      MAIL_HOST: string;
      MAIL_PORT: string;
      MAIL_LOGIN: string;
      NODE_ENV: "production" | "development" | "test";
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
