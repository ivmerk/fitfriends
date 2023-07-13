import { Entity } from 'src/types/entity.interface';
import { UserBalance } from 'src/types/user-balance.interface';

export class UserBalanceEntity
  implements Entity<UserBalanceEntity>, UserBalance
{
  public userId: number;
  public trainingId: number;
  public trainingQtt: number;

  constructor(userBalance: UserBalance) {
    this.fillEntity(userBalance);
  }

  fillEntity(entity: UserBalance) {
    this.userId = entity.userId;
    this.trainingId = entity.trainingId;
    this.trainingQtt = entity.trainingQtt;
  }

  public toObject(): UserBalanceEntity {
    return { ...this };
  }
}
