import { Expose } from 'class-transformer';

export class FeedbackRdo {
  @Expose()
  public feedbackId: number;
  @Expose()
  public userId: number;
  @Expose()
  public trainingId: number;
  @Expose()
  public rating: number;
  @Expose()
  public text: string;
  @Expose()
  public createdAt: Date;
}
