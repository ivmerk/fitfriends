import { Injectable } from '@nestjs/common';
import { User } from 'src/types/user.interface';
import { UserFriendEntity } from 'src/user-friend/user-friend.entity';
import { UserFriendRepository } from 'src/user-friend/user-friend.repository';
import { FitnessUserService } from 'src/users/fitness-user/fitness-user.service';

@Injectable()
export class UserRoomService {
  constructor(
    private readonly fitnessUserService: FitnessUserService,
    private readonly userFriendRepository: UserFriendRepository,
  ) {}

  public async addFriend(userId: number, friendId: number) {
    const friend = await this.fitnessUserService.getUser(friendId);
    const userFrientEntity = new UserFriendEntity({
      userId: userId,
      friendId: friendId,
    });
    if (friend) {
      return await this.userFriendRepository.create(userFrientEntity);
    }
  }

  public async delFriend(userId: number, friendId: number) {
    const friend = await this.userFriendRepository.findByUserIdAndFriendId(
      userId,
      friendId,
    );
    if (friend) {
      return await this.userFriendRepository.destroy(friend.userFriendId);
    }
  }

  public async showFriends(userId: number): Promise<User[] | null> {
    const userFriends = await this.userFriendRepository.findByUserId(userId);
    let friends: User[] = [];
    if (userFriends) {
      friends = await Promise.all(
        userFriends.map(async (usefFriend) => {
          return await this.fitnessUserService.getUser(usefFriend.friendId);
        }),
      );
      return friends;
    }
  }
}
