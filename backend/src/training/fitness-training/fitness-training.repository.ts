import { Injectable } from '@nestjs/common';
import { CRUDRepository } from 'src/types/crud-repository';
import { FitnessTrainingEntity } from './fitness-training.entity';
import { Training } from 'src/types/training.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FitnessTrainingRepository
  implements CRUDRepository<FitnessTrainingEntity, number, Training>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    fitnessTrainingEntity: FitnessTrainingEntity,
  ): Promise<Training> {
    const entityData = fitnessTrainingEntity.toObject();
    console.log(entityData);
    return await this.prisma.trainingEntity.create({
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
    return await this.prisma.trainingEntity.update({
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
    {
      limit,
      page,
      priceMin,
      priceMax,
      caloriesQttMin,
      caloriesQttMax,
      rating,
      durations,
      priceSortType,
    },
    trainerId: number,
  ): Promise<Training[] | null> {
    return await this.prisma.trainingEntity.findMany({
      where: {
        AND: [
          { trainerId },
          {
            price: { gte: priceMin },
          },
          { price: { lte: priceMax } },
          { caloriesQtt: { gte: caloriesQttMin } },
          { caloriesQtt: { lte: caloriesQttMax } },
          { rating: { gte: rating } },
          { duration: { in: durations } },
        ],
      },

      orderBy: priceSortType === 'asc' ? { price: 'asc' } : { price: 'desc' },
      include: { feedbacks: true },
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findByTranerId(trainerId: number): Promise<Training[] | null> {
    return await this.prisma.trainingEntity.findMany({
      where: { trainerId },
    });
  }
}
