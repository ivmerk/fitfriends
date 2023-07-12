import { Entity } from 'src/types/entity.interface';
import { OrderTraining } from 'src/types/order-training.interface';

export class OrderTrainingEntity
  implements Entity<OrderTrainingEntity>, OrderTraining
{
  public userId: number;
  public typeOfOrder: string;
  public trainingId: number;
  public price: number;
  public qtt: number;
  public typeOfPayment: string;
  public createdAt?: Date;

  constructor(orderTraining: OrderTraining) {
    this.fillEntity(orderTraining);
  }

  public fillEntity(entity: OrderTraining) {
    this.userId = entity.userId;
    this.typeOfOrder = entity.typeOfOrder;
    this.trainingId = entity.trainingId;
    this.price = entity.price;
    this.qtt = entity.qtt;
    this.typeOfPayment = entity.typeOfPayment;
    this.createdAt = new Date();
  }

  public toObject(): OrderTrainingEntity {
    return { ...this };
  }
}
