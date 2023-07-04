export const userGenders: string[] = ['женский', 'мужской', 'неважно'];

export const userAvatarTypes: string[] = ['.jpg', '.png'];

export const MAXIMUM_USER_AVATAR_FILE_SIZE = 1000000;

export enum UserTitleLength {
  Min = 1,
  Max = 15,
}

export enum UserPasswordLength {
  Min = 6,
  Max = 12,
}

export enum UserDescriptionLength {
  Min = 10,
  Max = 140,
}

export const userLocations: string[] = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
];

export const userBackgroundTypes: string[] = ['.jpg', '.png'];

export enum CaloriesQttDaily {
  Min = 1000,
  Max = 5000,
}

export const MAXIMUM_TRAINING_TYPES_CHOICE = 3;

export const trainerSertificateTypes: string[] = ['.pdf'];

export enum TrainerMeritLength {
  Min = 10,
  Max = 140,
}
export const levelsOfExperience: string[] = [
  'новичок',
  'любитель',
  'профессионал',
];

export enum CaloriesQtt {
  Min = 1000,
  Max = 5000,
}
