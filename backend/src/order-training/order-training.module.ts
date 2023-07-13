import { Module } from '@nestjs/common';
import { OrderTrainingRepository } from './order-training.repository';

@Module({
  providers: [OrderTrainingRepository],
  exports: [OrderTrainingRepository],
})
export class OrderTrainingModule {}
