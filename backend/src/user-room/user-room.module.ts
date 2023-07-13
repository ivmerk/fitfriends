import { Module } from '@nestjs/common';
import { UserRoomController } from './user-room.controller';
import { UserRoomService } from './user-room.service';
import { FitnessUserModule } from 'src/users/fitness-user/fitness-user.module';
import { UserFriendModule } from 'src/user-friend/user-friend.module';
import { UserBalanceModule } from 'src/user-balance/user-balance.module';

@Module({
  imports: [FitnessUserModule, UserFriendModule, UserBalanceModule],
  controllers: [UserRoomController],
  providers: [UserRoomService],
})
export class UserRoomModule {}
