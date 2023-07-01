export interface OrderTraining {
  orderTrainingId?: number;
  userId: number;
  typeOfOrder: string;
  trainingId: number;
  price: number;
  qtt: number;
  typeOfPayment: string;
  createdAt?: Date;
}
