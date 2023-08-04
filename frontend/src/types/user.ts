import { OrderTrainingData } from './order-traiding-data';
import { PersonalOrderTrainingData } from './personal-order-training-data';
import { UserBalanceData } from './user-balance-data';
import { UserFriendData } from './user-friend-data';

export type User = {
  userId: number;
  userName: string;
  userMail: string;
  userAvatar: string;
  passwordHash: string;
  userGender: string;
  birthDate: string;
  userRole: string;
  description: string;
  location: string;
  backgraundPicture: string;
  createdAt: Date;
  clientBody: ClientBody | null;
  trainerBody: TrainerBody | null;
  levelOfExperience: string;
  typesOfTraining: string[];
  orders: OrderTrainingData[];
  personalOrders: PersonalOrderTrainingData[];
  userBalance: UserBalanceData[];
  friends: UserFriendData[];
  token: string;
};

export type ClientBody = {
  clientBodyId: number;
  userId: number;
  timeOfTraining: string;
  caloryLosingPlanTotal: number;
  caloryLosingPlanDaily: number;
  readinessForTraining: boolean;
};

export type TrainerBody = {
  trainerBodyId: number;
  userId: number;
  sertificate: string;
  merit: string;
  readinessForPrivate: boolean;
};

export type UserFormRegister = {
  userName: string;
  userMail: string;
  userAvatar: string;
  birthDate: string;
  location: string;
  password: string;
  userGender: string;
  userRole: string;
};
