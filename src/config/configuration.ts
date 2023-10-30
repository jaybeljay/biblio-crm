import * as Joi from 'joi';
import { BaseValidationOptions } from 'joi';
import { AppEnvironment, Config } from './types';

export const currentEnv =
  (process.env.APP_ENVIRONMENT as AppEnvironment) || 'development';

export const validationSchema = Joi.object({
  // APP
  PORT: Joi.number().required(),
  APP_ENVIRONMENT: Joi.string().valid('development', 'staging', 'production'),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'staging')
    .default('development'),

  // MONGO
  MONGODB_URI: Joi.string().required(),

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
