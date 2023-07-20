import { Module } from '@nestjs/common';
import { FitnessTrainingRepository } from './fitness-training.repository';
import FitnessTrainingService from './fitness-training.service';
import { FitnessTrainingController } from './fitness-training.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from 'src/common/get-jwt-options';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [FitnessTrainingController],
  providers: [FitnessTrainingRepository, FitnessTrainingService],
  exports: [FitnessTrainingRepository],
})
export default class FitnessTrainingModule {}
