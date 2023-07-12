import { Injectable } from '@nestjs/common';
import { CRUDRepository } from 'src/types/crud-repository';
import { FitnessTrainingEntity } from './fitness-training.entity';
import { Training } from 'src/types/training.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import TrainingFilter from 'src/types/training-filter.interface';

@Injectable()
export class FitnessTrainingRepository
  implements CRUDRepository<FitnessTrainingEntity, number, Training>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    fitnessTrainingEntity: FitnessTrainingEntity,
  ): Promise<Training> {
    const entityData = fitnessTrainingEntity.toObject();
    return this.prisma.trainingEntity.create({
      data: {
        ...entityData,
        feedbacks: {
          connect: [],
        },
      },
      include: { feedbacks: true },
    });
  }
  public async destroy(trainingId: number): Promise<void> {
    await this.prisma.trainingEntity.delete({
      where: {
        trainingId,
      },
      include: { feedbacks: true },
    });
  }
  public async findById(trainingId: number): Promise<Training | null> {
    return this.prisma.trainingEntity.findFirst({
      where: {
        trainingId,
      },
      include: { feedbacks: true },
    });
  }

  public async update(
    trainingId: number,
    fitnessTrainingEntity: FitnessTrainingEntity,
  ): Promise<Training> {
    const entityData = fitnessTrainingEntity.toObject();
    return this.prisma.trainingEntity.update({
      where: {
        trainingId,
      },
      data: {
        ...entityData,
        feedbacks: {
          connect: fitnessTrainingEntity.feedbacks.map(({ feedbackId }) => ({
            feedbackId,
          })),
        },
      },
    });
  }

  public async find(
    filter: TrainingFilter,
    trainerId,
  ): Promise<Training[] | null> {
    return this.prisma.trainingEntity.findMany({
      where: {
        AND: [
          { trainerId },
          {
            price: { gte: filter.priceMin },
          },
          { price: { lte: filter.priceMax } },
          { caloriesQtt: { gte: filter.caloriesQttMin } },
          { caloriesQtt: { lte: filter.caloriesQttMax } },
          { rating: { gte: filter.rating } },
          { duration: { in: filter.durations } },
        ],
      },

      include: { feedbacks: true },
    });
  }
}
