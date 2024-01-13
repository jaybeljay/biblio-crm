export type AppEnvironment = 'development' | 'staging' | 'production';

export interface Config {
  app: {
    port: number;
    environment: AppEnvironment;
  };
  mongo: {
    uri: string;
    database: string;
    username: string;
    password: string;
    port: number;
    host: string;
    replicaSet: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}
