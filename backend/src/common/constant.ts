export const SALT_ROUNDS = 10;

export enum Rating {
  Min = 0,
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

export const sortingType: string[] = ['asc', 'desc', 'none'];

export enum SortingType {
  Asc = 'asc',
  Desc = 'desc',
  None = 'none',
}
export enum NotificationTextLength {
  Min = 10,
  Max = 140,
}

export const typesOfNotification: string[] = [
  'добавить в друзья',
  'пригласить на тренировку',
  'запрос на персональную тренировку',
];
