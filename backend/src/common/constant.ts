export const SALT_ROUNDS = 10;

export enum Rating {
  Min = 1,
  Max = 5,
}

export enum FeedbackTextLength {
  Min = 100,
  Max = 1024,
}

export enum TrainingQtt {
  Min = 1,
  Max = 50,
}
export const typesOfOrder: string[] = ['абонемент'];

export const typesOfPayment: string[] = ['visa', 'mir', 'umoney'];

export const ordersCondition: string[] = [
  'на рассмотрении',
  'отклонён',
  'принят',
];

export enum NotificationTextLength {
  Min = 10,
  Max = 140,
}
