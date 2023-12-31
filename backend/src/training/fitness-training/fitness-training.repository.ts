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
      ratingMin,
      ratingMax,
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
          { rating: { gte: ratingMin } },
          { rating: { lte: ratingMax } },
          { duration: { in: durations } },
        ],
      },

      orderBy: priceSortType === 'asc' ? { price: 'asc' } : { price: 'desc' },
      include: { feedbacks: true },
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findForCatalog({
    limit,
    page,
    priceMin,
    priceMax,
    caloriesQttMin,
    caloriesQttMax,
    ratingMin,
    ratingMax,
    typesOfTraining,
    priceSortType,
  }): Promise<Training[] | null> {
    return await this.prisma.trainingEntity.findMany({
      where: {
        AND: [
          {
            price: { gte: priceMin },
          },
          { price: { lte: priceMax } },
          { caloriesQtt: { gte: caloriesQttMin } },
          { caloriesQtt: { lte: caloriesQttMax } },
          { rating: { gte: ratingMin } },
          { rating: { lte: ratingMax } },
          { typeOfTraining: { in: typesOfTraining } },
        ],
      },

      orderBy:
        priceSortType !== 'none'
          ? priceSortType === 'asc'
            ? { price: 'asc' }
            : { price: 'desc' }
          : { createdAt: 'desc' },
      include: { feedbacks: true },
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async findByTranerId(trainerId: number): Promise<Training[] | null> {
    return await this.prisma.trainingEntity.findMany({
      where: { trainerId },
    });
  }

  public async findRecomend({
    typesOfTraining,
    caloriesQtt,
    duration,
    levelOfUser,
  }): Promise<Training[] | null> {
    return await this.prisma.trainingEntity.findMany({
      where: {
        AND: [
          { caloriesQtt: { gte: caloriesQtt } },
          { duration },
          { levelOfUser },
          { typeOfTraining: { in: typesOfTraining } },
        ],
      },
      orderBy: { rating: 'desc' },
    });
  }

  public async findFromTrainer(trainerId: number): Promise<Training[] | null> {
    return await this.prisma.trainingEntity.findMany({
      where: {
        trainerId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
