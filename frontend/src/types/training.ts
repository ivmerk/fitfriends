import { Feedback } from './feedback';

export type Training = {
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
  trainerId: number;
  isPromo: boolean;
  feedbacks?: Feedback[];
};
