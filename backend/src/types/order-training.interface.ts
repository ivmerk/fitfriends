import { Training } from './training.interface';

export interface OrderTraining {
  orderTrainingId?: number;
  typeOrder: string;
  training: Training;
  price: number;
  qtt: number;
  typeOfPayment: string;
  createdAt?: Date;
}
