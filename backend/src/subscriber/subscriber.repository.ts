import { CRUDRepository } from 'src/types/crud-repository';
import { SubscriberEntity } from './subscriber.entity';
import { Subscriber } from 'src/types/subscriber.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriberRepository
  implements CRUDRepository<SubscriberEntity, number, Subscriber>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: SubscriberEntity): Promise<Subscriber> {
    const entity = item.toObject();
    return await this.prisma.subscriber.create({ data: { ...entity } });
  }

  public async destroy(subscriberId: number): Promise<void> {
    await this.prisma.subscriber.delete({ where: { subscriberId } });
  }

  public async findById(subscriberId: number): Promise<Subscriber> {
    return await this.prisma.subscriber.findFirst({ where: { subscriberId } });
  }

  public async findByTrainerId(trainerId: number): Promise<Subscriber[]> {
    return await this.prisma.subscriber.findMany({ where: { trainerId } });
  }
}
