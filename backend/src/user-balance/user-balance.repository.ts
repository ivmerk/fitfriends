import { CRUDRepository } from 'src/types/crud-repository';
import { UserBalanceEntity } from './user-balance.entity';
import { UserBalance } from 'src/types/user-balance.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserBalanceRepository
  implements CRUDRepository<UserBalanceEntity, number, UserBalance>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    userBalanceEntity: UserBalanceEntity,
  ): Promise<UserBalance> {
    const entity = userBalanceEntity.toObject();
    return await this.prisma.userBalance.create({
      data: { ...entity },
    });
  }

  public async destroy(userBalanceId: number): Promise<void> {
    await this.prisma.userBalance.delete({
      where: { userBalanceId },
    });
  }

  public async findById(userBalanceId: number): Promise<UserBalance> {
    return await this.prisma.userBalance.findFirst({
      where: { userBalanceId },
    });
  }
}
