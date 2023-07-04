import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config.js';
import { FitnessUserModule } from './fitness-user/fitness-user.module.js';
import { AuthentificationModule } from './authentification/authentification.module.js';

const ENV_USERS_FILE_PATH = '../.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
    FitnessUserModule,
    AuthentificationModule,
  ],
})
export class UsersModule {}
