import * as Joi from 'joi';
import { BaseValidationOptions } from 'joi';
import { AppEnvironment, Config } from './types';

export const currentEnv = process.env.APP_ENVIRONMENT as AppEnvironment;

export const validationSchema = Joi.object({
  // APP
  PORT: Joi.number().required(),
  APP_ENVIRONMENT: Joi.string().valid('development', 'staging', 'production'),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'staging')
    .default('development'),

  // MONGO
  MONGODB_URI: Joi.string().required(),
});

export const configuration: () => Promise<Config> = async () =>  {return {
  app: {
    port: parseInt(process.env.PORT, 10),
    environment: currentEnv,
  },
  mongo: {
    uri: process.env.MONGODB_URI,
  }
}};

export const validationOptions: BaseValidationOptions = {
  abortEarly: false,
  convert: true,
};
