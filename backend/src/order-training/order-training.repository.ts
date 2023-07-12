import { CRUDRepository } from 'src/types/crud-repository';
import { OrderTrainingEntity } from './order-training.entity';
import { OrderTraining } from 'src/types/order-training.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderTrainingRepository
  implements CRUDRepository<OrderTrainingEntity, number, OrderTraining>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    orderTrainingEntity: OrderTrainingEntity,
  ): Promise<OrderTraining> {
    const entityOrder = orderTrainingEntity.toObject();
    return await this.prisma.orderTraining.create({
      data: { ...entityOrder },
    });
  }

  public async destroy(orderTrainingId: number): Promise<void> {
    await this.prisma.orderTraining.delete({
      where: {
        orderTrainingId,
      },
    });
  }

  public async findById(orderTrainingId: number): Promise<OrderTraining> {
    return await this.prisma.orderTraining.findFirst({
      where: {
        orderTrainingId,
      },
    });
  }

  public async findByTrainingId(
    trainingId: number,
  ): Promise<OrderTraining[] | null> {
    return await this.prisma.orderTraining.findMany({
      where: {
        trainingId,
      },
    });
  }

  public async findByUserId(userId: number): Promise<OrderTraining[] | null> {
    return await this.prisma.orderTraining.findMany({
      where: {
        userId,
      },
    });
  }
}
