import { Training } from './training.interface';

export interface Feedback {
  feedbackId?: number;
  author: string;
  training: Training;
  rating: number;
  text: string;
  createdAt?: Date;
}
