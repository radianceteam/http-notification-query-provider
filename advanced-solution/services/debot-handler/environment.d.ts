declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVICE: string;
      SERVER_HOST: string;
      SERVER_PORT: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
