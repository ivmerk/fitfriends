import { CRUDRepository } from 'src/types/crud-repository';
import { FeedbackEntity } from './feedback.entity';
import { Feedback } from 'src/types/feedback.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedbackRepository
  implements CRUDRepository<FeedbackEntity, number, Feedback>
{
  constructor(private readonly prisma: PrismaService) {}
  public async create(feedbackEntity: FeedbackEntity): Promise<Feedback> {
    const entity = feedbackEntity.toObject();
    return await this.prisma.feedback.create({ data: { ...entity } });
  }

  public async destroy(feedbackId: number): Promise<void> {
    await this.prisma.feedback.delete({ where: { feedbackId } });
  }

  public async findById(feedbackId: number): Promise<Feedback> {
    return await this.prisma.feedback.findFirst({ where: { feedbackId } });
  }
}
