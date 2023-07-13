import { CRUDRepository } from 'src/types/crud-repository';
import { UserFriendEntity } from './user-friend.entity';
import { UserFriend } from 'src/types/user-friend';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserFriendRepository
  implements CRUDRepository<UserFriendEntity, number, UserFriend>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(userFriendEntity: UserFriendEntity): Promise<UserFriend> {
    const entity = userFriendEntity.toObject();
    return await this.prisma.userFriend.create({
      data: { ...entity },
    });
  }

  public async destroy(userFriendId: number): Promise<void> {
    await this.prisma.userFriend.delete({ where: { userFriendId } });
  }

  public async findById(userFriendId: number): Promise<UserFriend> {
    return await this.prisma.userFriend.findFirst({ where: { userFriendId } });
  }

  public async findByUserId(userId: number): Promise<UserFriend[] | null> {
    return await this.prisma.userFriend.findMany({ where: { userId } });
  }

  public async findByUserIdAndFriendId(
    userId: number,
    friendId: number,
  ): Promise<UserFriend> {
    return await this.prisma.userFriend.findFirst({
      where: { userId, friendId },
    });
  }
}
