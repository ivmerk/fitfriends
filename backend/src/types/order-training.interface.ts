import { Training } from './training.interface';
import { User } from './user.interface';

export interface OrderTraining {
  orderTrainingId?: number;
  user: User;
  typeOfOrder: string;
  training: Training;
  price: number;
  qtt: number;
  typeOfPayment: string;
  createdAt?: Date;
}
