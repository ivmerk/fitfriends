import { Module } from '@nestjs/common';
import { UserRoomService } from './user-room.service';
import { FitnessUserModule } from 'src/users/fitness-user/fitness-user.module';
import { UserFriendModule } from 'src/user-friend/user-friend.module';
import { UserBalanceModule } from 'src/user-balance/user-balance.module';
import { FeedbackModule } from 'src/feedback/feedback.module';
import FitnessTrainingModule from 'src/training/fitness-training/fitness-training.module';
import { OrderTrainingModule } from 'src/order-training/order-training.module';
import { PersonalOrderTrainingModule } from 'src/personal-order-training/personal-order-training.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from 'src/common/get-jwt-options';
import { UserRoomController } from './user-room.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    FitnessUserModule,
    FitnessTrainingModule,
    UserFriendModule,
    UserBalanceModule,
    OrderTrainingModule,
    FeedbackModule,
    PersonalOrderTrainingModule,
  ],
  controllers: [UserRoomController],
  providers: [UserRoomService],
})
export class UserRoomModule {}
