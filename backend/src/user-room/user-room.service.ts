import { Injectable } from '@nestjs/common';
import { FeedbackEntity } from 'src/feedback/feedback.entity';
import { FeedbackRepository } from 'src/feedback/feedback.repository';
import { FitnessTrainingEntity } from 'src/training/fitness-training/fitness-training.entity';
import { FitnessTrainingRepository } from 'src/training/fitness-training/fitness-training.repository';
import { User } from 'src/types/user.interface';
import { UserBalanceEntity } from 'src/user-balance/user-balance.entity';
import { UserBalanceRepository } from 'src/user-balance/user-balance.repository';
import { UserFriendEntity } from 'src/user-friend/user-friend.entity';
import { UserFriendRepository } from 'src/user-friend/user-friend.repository';
import { UpdateUserDto } from 'src/users/fitness-user/dto/update-user.dto';
import { FitnessUserService } from 'src/users/fitness-user/fitness-user.service';

@Injectable()
export class UserRoomService {
  constructor(
    private readonly fitnessUserService: FitnessUserService,
    private readonly userFriendRepository: UserFriendRepository,
    private readonly userBalanceRepository: UserBalanceRepository,
    private readonly feedbackRepository: FeedbackRepository,
    private readonly fitnessTraningRepository: FitnessTrainingRepository,
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

  public async showBalance(userId: number, trainerId: number) {
    return await this.userBalanceRepository.findByUserIdAndTrainingId(
      userId,
      trainerId,
    );
  }

  public async spendTraning(userId: number, trainingId: number) {
    const userBalance =
      await this.userBalanceRepository.findByUserIdAndTrainingId(
        userId,
        trainingId,
      );
    if (userBalance) {
      if (userBalance.trainingQtt === 1) {
        await this.userBalanceRepository.destroy(userBalance.userBalanceId);
      } else {
        const newBalance = new UserBalanceEntity({ ...userBalance });
        newBalance.trainingQtt--;
        return await this.userBalanceRepository.update(
          userBalance.userBalanceId,
          newBalance,
        );
      }
    }
  }
  public async postFeedback(userId: number, dto) {
    const traning = await this.fitnessTraningRepository.findById(
      dto.trainingId,
    );
    if (traning) {
      const rating =
        (traning.feedbacks.reduce((sum, item) => sum + item.rating, 0) +
          dto.rating) /
        (traning.feedbacks.length + 1);
      const feedbackEntity = new FeedbackEntity({ ...dto, userId });
      const trainingEntity = new FitnessTrainingEntity({ ...traning, rating });
      await this.fitnessTraningRepository.update(
        traning.trainingId,
        trainingEntity,
      );
      return await this.feedbackRepository.create(feedbackEntity);
    }
  }
}
