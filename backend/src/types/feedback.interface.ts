import { Training } from './training.interface';
import { User } from './user.interface';

export interface Feedback {
  feedbackId?: number;
  user: User;
  training: Training;
  rating: number;
  text: string;
  createdAt?: Date;
}
