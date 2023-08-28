import { Expose } from 'class-transformer';

export class UserFriendRdo {
  @Expose()
  public userFriendId: number;
  @Expose()
  public userId: number;
  @Expose()
  public friendId: number;
  @Expose()
  public isConfirmed: boolean;
}
