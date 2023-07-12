import { Module } from '@nestjs/common';
import { OrderTrainingRepository } from './order-training.repository';

@Module({
  providers: [OrderTrainingRepository],
})
export class OrderTrainingModule {}
