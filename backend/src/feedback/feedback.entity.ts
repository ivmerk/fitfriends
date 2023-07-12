import { Entity } from 'src/types/entity.interface';
import { Feedback } from 'src/types/feedback.interface';

export class FeedbackEntity implements Entity<FeedbackEntity>, Feedback {
  public userId: number;
  public trainingId: number;
  public rating: number;
  public text: string;
  public createdAt?: Date;

  constructor(feedBack: Feedback) {
    this.fillEntity(feedBack);
  }

  public fillEntity(entity: Feedback) {
    this.userId = entity.userId;
    this.trainingId = entity.trainingId;
    this.rating = entity.rating;
    this.text = entity.text;
    this.createdAt = new Date();
  }

  public toObject(): FeedbackEntity {
    return { ...this };
  }
}
