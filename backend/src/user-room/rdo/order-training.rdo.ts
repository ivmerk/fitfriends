import { Expose } from 'class-transformer';

export class OrderTrainingRdo {
  @Expose()
  public orderTrainingId: number;
  @Expose()
  public userId: number;
  @Expose()
  public typeOfOrder: string;
  @Expose()
  public trainingId: number;
  @Expose()
  public price: number;
  @Expose()
  public qtt: number;
  @Expose()
  public typeOfPayment: string;
  @Expose()
  public createdAt?: Date;
}
