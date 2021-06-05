
export interface AppEnvironment {
  NAME: string;
  NODE_ENV: string;
  APP: {
    PORT: number;
  };
  DATABASE: {
    MONGODB: {
      USERNAME: string;
      PASSWORD: string;
      HOST: string;
      PORT: number;
      NAME: string;
    }
  };
  SECURE: {
    JWT: {
      JWT_SECRET: string;
      TOKEN_EXPIRE: number;
    },
  };
  DOCUMENT: {
    DOC_DEV: string;
    DOC_API: string;
  };
  API_RESTRICT: {
    CLIENT_SECRET: string;
  };
}
