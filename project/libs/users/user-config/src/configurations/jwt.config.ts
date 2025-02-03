import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface JWTConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

const validationSchema = Joi.object({
  accessTokenSecret: Joi.string().required(),
  accessTokenExpiresIn: Joi.string().required(),
  refreshTokenSecret: Joi.string().required(),
  refreshTokenExpiresIn: Joi.string().required()
});

function validateConfig(config: JWTConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Account JWTConfig Validation Error]: ${error.message}`)
  }
}

function getConfig(): JWTConfig {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_TOKEN_EXPIRES,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_JWT_TOKEN_EXPIRES,
  }

  validateConfig(config)
  return config
}

export default registerAs('jwt', getConfig);
