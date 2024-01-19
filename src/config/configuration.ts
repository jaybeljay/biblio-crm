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
  MONGO_URI: Joi.string().required(),
  MONGO_INITDB_DATABASE: Joi.string().required(),
  MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
  MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
  MONGO_PORT: Joi.number().required(),
  MONGO_HOST: Joi.string().required(),
  MONGO_REPLICA_SET_NAME: Joi.string().required(),

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
      uri: process.env.MONGO_URI,
      database: process.env.MONGO_INITDB_DATABASE,
    username: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    port: parseInt(process.env.MONGO_PORT),
    host: process.env.MONGO_HOST,
    replicaSet: process.env.MONGO_REPLICA_SET_NAME,
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
