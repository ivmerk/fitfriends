import { Module } from '@nestjs/common';
import { UserFriendRepository } from './user-friend.repository';

@Module({
  providers: [UserFriendRepository],
  exports: [UserFriendRepository],
})
export class UserFriendModule {}
