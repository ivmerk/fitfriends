import { User } from './user.interface';

export interface PersonalOrderTraining {
  personalOrderTrainingId?: number;
  user: User;
  trainer: User;
  createdAt?: Date;
  updateAt?: Date;
  orderCondition: string;
}
