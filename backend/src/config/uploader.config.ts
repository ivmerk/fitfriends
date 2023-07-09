import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface UploaderConfig {
  serveRoot: string;
  uploadDirectory: string;
}

export default registerAs('application', (): UploaderConfig => {
  const config: UploaderConfig = {
    serveRoot: process.env.SERVE_ROOT,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
  };

  const validationSchema = Joi.object<UploaderConfig>({
    serveRoot: Joi.string().required(),
    uploadDirectory: Joi.string(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Uploader Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
