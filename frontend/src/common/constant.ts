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

export const sortingType: string[] = ['asc', 'desc'];

export enum NotificationTextLength {
  Min = 10,
  Max = 140,
}

export const typesOfNotification: string[] = [
  'добавить в друзья',
  'пригласить на тренировку',
  'запрос на персональную тренировку',
];

export const hopeSoonImage = '/uploads/nearest-gym-01@2x.webp';

export const hostPort = 'http://localhost:3333';

export const trainingCardsImage = [
  {
    name: 'pilates',
    nameCyr: 'пилатес',
    img: 'img/content/thumbnails/training-01',
  },
  {
    name: 'crossfit',
    nameCyr: 'кроссфит',
    img: 'img/content/thumbnails/training-02',
  },
  {
    name: 'boxing',
    nameCyr: 'бокс',
    img: 'img/content/thumbnails/training-03',
  },
  {
    name: 'power',
    nameCyr: 'силовые',
    img: 'img/content/thumbnails/training-04',
  },
  {
    name: 'yoga',
    nameCyr: 'йога',
    img: 'img/content/thumbnails/training-05',
  },
  {
    name: 'run',
    nameCyr: 'бег',
    img: 'img/content/thumbnails/training-06',
  },
  {
    name: 'stratching',
    nameCyr: 'стретчинг',
    img: 'img/content/thumbnails/training-09',
  },
  {
    name: 'aerobics',
    nameCyr: 'аэробика',
    img: 'img/content/thumbnails/training-12',
  },
];
