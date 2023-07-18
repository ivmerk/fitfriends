import { Entity } from 'src/types/entity.interface';
import { Subscriber } from 'src/types/subscriber.interface';

export class SubscriberEntity implements Entity<SubscriberEntity>, Subscriber {
  public email: string;
  public name: string;
  public trainerId: number;

  constructor(item: Subscriber) {
    this.fillEntity(item);
  }
  public fillEntity(entity: Subscriber) {
    this.email = entity.email;
    this.name = entity.name;
    this.trainerId = entity.trainerId;
  }

  public toObject(): SubscriberEntity {
    return { ...this };
  }
}
