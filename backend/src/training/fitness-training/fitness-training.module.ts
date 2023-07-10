import { Module } from '@nestjs/common';
import { FitnessTrainingRepository } from './fitness-training.repository';
import FitnessTrainongService from './fitness-training.service';
import { FitnessTrainingController } from './fitness-training.controller';

@Module({
  controllers: [FitnessTrainingController],
  providers: [FitnessTrainingRepository, FitnessTrainongService],
})
export default class FitnessTrainingModule {}
