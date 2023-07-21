import { Expose } from 'class-transformer';

export class PersonalOrderTrainingRdo {
  @Expose()
  public personalOrderTrainingId: number;
  @Expose()
  public userId: number;
  @Expose()
  public trainerId: number;
  @Expose()
  public orderCondition: string;
  @Expose()
  public createdAt: Date;
  @Expose()
  public updateAt: Date;
}
