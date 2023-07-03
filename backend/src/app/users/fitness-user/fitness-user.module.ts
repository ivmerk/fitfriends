import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FitnessUserController } from './fitness-user.controller.js';
import { FitnessUserRepository } from './fitness-user.repository.js';
import { FitnessUserService } from './fitness-user.service.js';
import { JwtModule } from '@nestjs/jwt';
import { getJwtOptions } from '../../../common/get-jwt-options.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [FitnessUserController],
  providers: [FitnessUserRepository, FitnessUserService],
  exports: [FitnessUserRepository],
})
export class FitnessUserModule {}
