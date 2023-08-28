import { Entity } from 'src/types/entity.interface';
import { UserFriend } from 'src/types/user-friend';

export class UserFriendEntity implements Entity<UserFriendEntity>, UserFriend {
  public userFriendId: number;
  public userId: number;
  public friendId: number;
  public isConfirmed?: boolean;

  constructor(userFriend: UserFriend) {
    this.fillEntity(userFriend);
  }
  fillEntity(entity: UserFriend) {
    this.userId = entity.userId;
    this.friendId = entity.friendId;
    this.isConfirmed = entity.isConfirmed;
  }
  toObject(): UserFriendEntity {
    return { ...this };
  }
}
