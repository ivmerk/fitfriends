import { Module } from '@nestjs/common';
import FitnessTrainingModule from './fitness-training/fitness-training.module';

@Module({ imports: [FitnessTrainingModule] })
export default class TrainingModule {}
