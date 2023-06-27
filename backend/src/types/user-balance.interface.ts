import { Training } from './training.interface';
import { User } from './user.interface';

export interface UserBalance {
  userBalanceId?: number;
  user: User;
  training: Training;
  trainingQtt: number;
}
