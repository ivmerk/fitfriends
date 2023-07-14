import { Module } from '@nestjs/common';
import { FitnessTrainingRepository } from './fitness-training.repository';
import FitnessTrainingService from './fitness-training.service';
import { FitnessTrainingController } from './fitness-training.controller';

@Module({
  controllers: [FitnessTrainingController],
  providers: [FitnessTrainingRepository, FitnessTrainingService],
  exports: [FitnessTrainingRepository],
})
export default class FitnessTrainingModule {}
