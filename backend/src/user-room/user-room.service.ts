import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FeedbackEntity } from 'src/feedback/feedback.entity';
import { FeedbackRepository } from 'src/feedback/feedback.repository';
import { FitnessTrainingEntity } from 'src/training/fitness-training/fitness-training.entity';
import { FitnessTrainingRepository } from 'src/training/fitness-training/fitness-training.repository';
import { User } from 'src/types/user.interface';
import { UserBalanceEntity } from 'src/user-balance/user-balance.entity';
import { UserBalanceRepository } from 'src/user-balance/user-balance.repository';
import { UserFriendEntity } from 'src/user-friend/user-friend.entity';
import { UserFriendRepository } from 'src/user-friend/user-friend.repository';
import { FitnessUserService } from 'src/users/fitness-user/fitness-user.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderTrainingRepository } from 'src/order-training/order-training.repository';
import { OrderTrainingEntity } from 'src/order-training/order-training.entity';
import { UserRole } from 'src/types/user-role.enum';
import { NOT_ALLOW_BE_FRIEND_WITH_CLIENT } from './user-room.constant';
import { TokenPayload } from 'src/types/token-payload.interface';
import { PersonalOrderTrainingEntity } from 'src/personal-order-training/personal-order-training.entity';
import { ordersCondition } from 'src/common/constant';
import { PersonalOrderTrainingRepository } from 'src/personal-order-training/personal-order-training.repository';
import { TrainingListQuery } from './query/training-list.query';

@Injectable()
export class UserRoomService {
  constructor(
    private readonly fitnessUserService: FitnessUserService,
    private readonly userFriendRepository: UserFriendRepository,
    private readonly userBalanceRepository: UserBalanceRepository,
    private readonly feedbackRepository: FeedbackRepository,
    private readonly fitnessTrainingRepository: FitnessTrainingRepository,
    private readonly orderTrainingRepository: OrderTrainingRepository,
    private readonly personalOrderTrainingRepository: PersonalOrderTrainingRepository,
  ) {}

  public async addFriend(payload: TokenPayload, friendId: number) {
    const userId = payload.sub;
    const friend = await this.fitnessUserService.getUser(friendId);
    const userFrientEntity = new UserFriendEntity({
      userId,
      friendId,
    });
    if (
      friend.userRole === UserRole.Trainer &&
      payload.userRole === UserRole.Client
    ) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: NOT_ALLOW_BE_FRIEND_WITH_CLIENT,
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
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
    const traning = await this.fitnessTrainingRepository.findById(
      dto.trainingId,
    );
    if (traning) {
      const rating =
        (traning.feedbacks.reduce((sum, item) => sum + item.rating, 0) +
          dto.rating) /
        (traning.feedbacks.length + 1);
      const feedbackEntity = new FeedbackEntity({ ...dto, userId });
      const trainingEntity = new FitnessTrainingEntity({ ...traning, rating });
      await this.fitnessTrainingRepository.update(
        traning.trainingId,
        trainingEntity,
      );
      return await this.feedbackRepository.create(feedbackEntity);
    }
  }
  public async buyTrainings(userId: number, dto: CreateOrderDto) {
    const training = await this.fitnessTrainingRepository.findById(
      dto.trainingId,
    );
    const userBalance =
      await this.userBalanceRepository.findByUserIdAndTrainingId(
        userId,
        dto.trainingId,
      );
    if (training) {
      if (userBalance) {
        userBalance.trainingQtt += dto.qtt;
        const balanceEntity = new UserBalanceEntity({ ...userBalance });
        await this.userBalanceRepository.update(
          userBalance.userBalanceId,
          balanceEntity,
        );
      } else {
        console.log(dto, userBalance);
        const balanceEntity = new UserBalanceEntity({
          userId,
          trainingId: dto.trainingId,
          trainingQtt: dto.qtt,
        });
        await this.userBalanceRepository.create(balanceEntity);
      }

      const orderEntity = new OrderTrainingEntity({ ...dto, userId });
      return await this.orderTrainingRepository.create(orderEntity);
    }
  }

  public async buyPersonalTraining(userId: number, trainerId: number) {
    const trainer = await this.fitnessUserService.getUser(trainerId);
    if (trainer && userId !== trainerId) {
      const entity = new PersonalOrderTrainingEntity({
        userId,
        trainerId,
        orderCondition: ordersCondition[0],
      });
      return await this.personalOrderTrainingRepository.create(entity);
    }
  }

  public async getPersonalOrder(orderId: number) {
    return await this.personalOrderTrainingRepository.findById(orderId);
  }

  public async changeStatus({ orderId: orderId, newStatus: newStatus }) {
    const order = await this.personalOrderTrainingRepository.findById(orderId);
    if (order && order.orderCondition !== newStatus) {
      const entity = new PersonalOrderTrainingEntity({
        ...order,
        orderCondition: newStatus,
      });
      entity.createdAt = order.createdAt;
      return await this.personalOrderTrainingRepository.update(orderId, entity);
    }
  }

  public async createTrainerTrainingList(
    query: TrainingListQuery,
    payload: TokenPayload,
  ) {
    const myTrainings = await this.fitnessTrainingRepository.findByTranerId(
      payload.sub,
    );
    if (myTrainings) {
      const result = myTrainings.map(async (training) => {
        const orders = await this.orderTrainingRepository.findByTrainingId(
          training.trainingId,
        );
        if (orders) {
          const trainingQtt = orders.reduce((sum, item) => sum + item.qtt, 0);
          const totalPaymentAmount = trainingQtt * training.price;

          return {
            ...training,
            trainingQtt: trainingQtt,
            totalPaymentAmount: totalPaymentAmount,
          };
        }
      });
      return await Promise.all(result);
    }
  }
}
