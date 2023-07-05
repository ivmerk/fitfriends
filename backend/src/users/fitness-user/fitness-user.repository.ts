import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '../../types/crud-repository.js';
import { User } from '../../types/user.interface.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { FitnessUserEntity } from './fitness-user.entity.js';

@Injectable()
export class FitnessUserRepository
  implements CRUDRepository<FitnessUserEntity, number, User>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: FitnessUserEntity): Promise<User> {
    const entityData = item.toObject();
    return this.prisma.userEntity.create({
      data: {
        ...entityData,
        clientBody:
          item.clientBody != null
            ? {
                create: item.clientBody,
              }
            : undefined,
        trainerBody:
          item.trainerBody != null
            ? {
                create: item.trainerBody,
              }
            : undefined,
        orders: {
          connect: [],
        },
        personalOrders: {
          connect: [],
        },
        userBalance: {
          connect: [],
        },
      },
      include: {
        clientBody: true,
        trainerBody: true,
        orders: true,
        personalOrders: true,
        userBalance: true,
      },
    });
  }

  public async destroy(userId: number): Promise<void> {
    await this.prisma.userEntity.delete({
      where: {
        userId,
      },
      include: {
        clientBody: true,
        trainerBody: true,
        orders: true,
        personalOrders: true,
        userBalance: true,
      },
    });
  }

  public async findById(userId: number): Promise<User | null> {
    return this.prisma.userEntity.findFirst({
      where: {
        userId,
      },
      include: {
        clientBody: true,
        trainerBody: true,
      },
    });
  }
  public async findByEmail(userMail: string): Promise<User | null> {
    return this.prisma.userEntity.findFirst({
      where: {
        userMail,
      },
    });
  }
  // public async find(
  //   { limit, page }: CommentQuery,
  //   postId: number
  // ): Promise<Comment[]> | null {
  //   return this.prisma.comment.findMany({
  //     where: {
  //       postId: +postId,
  //     },
  //     take: limit,
  //     skip: page > 0 ? limit * (page - 1) : undefined,
  //   });
  // }
}
