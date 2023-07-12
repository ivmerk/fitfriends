import { Module } from '@nestjs/common';
import { FitnessTrainingRepository } from './fitness-training.repository';
import FitnessTrainongService from './fitness-training.service';
import { FitnessTrainingController } from './fitness-training.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/users/fitness-user/guards/jwt-auth.guard';

@Module({
  controllers: [FitnessTrainingController],
  providers: [
    FitnessTrainingRepository,
    FitnessTrainongService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export default class FitnessTrainingModule {}
