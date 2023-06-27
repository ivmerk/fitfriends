import { User } from './user.interface';

export interface Training {
  trainingId?: number;
  title: string;
  backgroundPicture: string;
  levelOfUser: string;
  typeOfTraining: string;
  duration: string;
  price: number;
  caloriesQtt: number;
  description: string;
  trainingGender: string;
  video: string;
  rating: number;
  trainer: User;
  isPromo: boolean;
}
