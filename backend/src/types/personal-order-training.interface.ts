import { User } from './user.interface';

export interface PersonalOrderTraining {
  personalOrderTraining?: number;
  user: User;
  trainer: User;
  createdAt?: Date;
  publishAt?: Date;
  orderCondition: string;
}
