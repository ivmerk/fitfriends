import { Entity } from 'src/types/entity.interface';
import { PersonalOrderTraining } from 'src/types/personal-order-training.interface';

export class PersonalOrderTrainingEntity
  implements Entity<PersonalOrderTrainingEntity>, PersonalOrderTraining
{
  userId: number;
  trainerId: number;
  orderCondition: string;
  createdAt: Date;
  updateAt: Date;

  constructor(item: PersonalOrderTraining) {
    this.fillEntity(item);
  }

  public fillEntity(entity: PersonalOrderTraining) {
    this.userId = entity.userId;
    this.trainerId = entity.trainerId;
    this.orderCondition = entity.orderCondition;
    this.createdAt = new Date();
    this.updateAt = new Date();
  }

  public toObject(): PersonalOrderTrainingEntity {
    return { ...this };
  }
}
