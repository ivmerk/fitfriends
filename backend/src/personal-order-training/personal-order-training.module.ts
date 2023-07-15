import { Module } from '@nestjs/common';
import { PersonalOrderTrainingRepository } from './personal-order-training.repository';

@Module({
  providers: [PersonalOrderTrainingRepository],
  exports: [PersonalOrderTrainingRepository],
})
export class PersonalOrderTrainingModule {}
