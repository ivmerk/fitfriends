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

export enum OrdersCondition {
  Waiting = 'на рассмотрении',
  Rejected = 'отклонён',
  Aprooved = 'принят',
}

export const sortingType: string[] = ['asc', 'desc', 'none'];

export const SERTIFICATES_SCREEN_COUNT_MAX = 3;

export const DEFAULT_SCREEN_ITEMS_COUNT = 6;

export const DEFAULT_MY_ORDER_ITEMS_COUNT = 4;

export const DEFAULT_TRAININ_CARDS_COUNT = 4;

export const DEFAULT_SPETIAL_OEFFERS_COUNT = 3;

export const DEFAULT_SPETIAL_OEFFERS_COUN_MAX = 9;

export const DEFAULT_MAIN_SCREEN_USERS_CARDS_COUNT = 4;

export const DEFAULT_MAIN_SCREEN_USERS_CARDS_COUNT_MAX = 8;

export const DEFAULT_USER_MENU_ITEMS_COUNT = 5;

export const DEFAULT_CARDS_COUNT = 50;

export enum NotificationTextLength {
  Min = 10,
  Max = 140,
}

export enum SortingType {
  Asc = 'asc',
  Desc = 'desc',
  None = 'none',
}

export const typesOfNotification: string[] = [
  'добавить в друзья',
  'пригласить на тренировку',
  'запрос на персональную тренировку',
];

export const HOPE_SOON_IMAGE = '/uploads/nearest-gym-01@2x.webp';

export const HOST_PORT = 'http://localhost:3333';

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
    nameCyr: 'стрейчинг',
    img: 'img/content/thumbnails/training-09',
  },
  {
    name: 'aerobics',
    nameCyr: 'аэробика',
    img: 'img/content/thumbnails/training-12',
  },
];
