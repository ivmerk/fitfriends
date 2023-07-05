import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FitnessUserController } from './fitness-user.controller.js';
import { FitnessUserRepository } from './fitness-user.repository.js';
import { FitnessUserService } from './fitness-user.service.js';
import { JwtModule } from '@nestjs/jwt';
import { getJwtOptions } from '../../common/get-jwt-options.js';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy.js';
import { JwtAccessStrategy } from '../strategies/jwt-accass.strtegy.js';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    RefreshTokenModule,
  ],
  controllers: [FitnessUserController],
  providers: [
    FitnessUserRepository,
    FitnessUserService,
    JwtRefreshStrategy,
    JwtAccessStrategy,
  ],
  exports: [FitnessUserRepository],
})
export class FitnessUserModule {}
