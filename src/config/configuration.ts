import * as Joi from 'joi';
import { BaseValidationOptions } from 'joi';
import { AppEnvironment, Config } from './types';

export const currentEnv =
  (process.env.APP_ENVIRONMENT as AppEnvironment) || 'development';

export const validationSchema = Joi.object({
  // APP
  PORT: Joi.number().required(),
  APP_ENVIRONMENT: Joi.string().valid('development', 'staging', 'production').default('development'),

  // MONGO
  MONGODB_URI: Joi.string().required(),
  MONGODB_DATABASE: Joi.string().required(),
  MONGODB_USERNAME: Joi.string().required(),
  MONGODB_PASSWORD: Joi.string().required(),
  MONGODB_PORT: Joi.number().required(),
  MONGODB_HOST: Joi.string().required(),
  MONGODB_REPLICA_SET: Joi.string().required(),

  //JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
});

export const configuration: () => Promise<Config> = async () => {
  return {
    app: {
      port: parseInt(process.env.PORT, 10),
      environment: currentEnv,
    },
    mongo: {
      uri: process.env.MONGODB_URI,
      database: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
    port: parseInt(process.env.MONGODB_PORT),
    host: process.env.MONGODB_HOST,
    replicaSet: process.env.MONGODB_REPLICA_SET,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  };
};

export const validationOptions: BaseValidationOptions = {
  abortEarly: false,
  convert: true,
};
