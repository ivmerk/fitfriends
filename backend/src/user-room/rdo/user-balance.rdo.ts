import { Expose } from 'class-transformer';

export class UserBalanceRdo {
  @Expose()
  public userBalanceId: number;
  @Expose()
  public userId: number;
  @Expose()
  public trainingId: number;
  @Expose()
  public trainingQtt: number;
}
