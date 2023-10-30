export type AppEnvironment = 'development' | 'staging' | 'production';

export interface Config {
  app: {
    port: number;
    environment: AppEnvironment;
  };
  mongo: {
    uri: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}
