import { Expose } from 'class-transformer';

export class TrainingOrderFeedRdo {
  @Expose()
  public trainingId: number;
  @Expose()
  public title: string;
  @Expose()
  public typeOfTraining: string;
  @Expose()
  public backgroundPicture: string;
  @Expose()
  public price: number;
  @Expose()
  public caloriesQtt: number;
  @Expose()
  public description: string;
  @Expose()
  public rating: number;
  @Expose()
  public trainingQtt: number;
  @Expose()
  public totalPaymentAmount: number;
}
