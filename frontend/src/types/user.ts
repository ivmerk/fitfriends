import { OrderTrainingData } from './order-traiding-data';
import { PersonalOrderTrainingData } from './personal-order-training-data';
import { UserBalanceData } from './user-balance-data';
import { UserFriendData } from './user-friend-data';

export type User = {
  userId?: number;
  userName: string;
  userMail: string;
  userAvatar: string;
  password?: string;
  passwordHash?: string;
  userGender: string;
  birthDate: string;
  userRole: string;
  description?: string;
  location: string;
  backgraundPicture?: string;
  createdAt?: Date;
  clientBody?: ClientBody;
  trainerBody?: TrainerBody;
  levelOfExperience: string;
  typesOfTraining: string[];
  orders?: OrderTrainingData[];
  personalOrders?: PersonalOrderTrainingData[];
  userBalance?: UserBalanceData[];
  friends?: UserFriendData[];
  token?: string;
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
  sertificates: string[];
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
  clientBody?: ClientBody;
  trainerBody?: TrainerBody;
};

export type UserFormRegisterDetailsClient = {
  typesOfTraining: string[];
  levelOfExperience: string;
  clientBody: {
    timeOfTraining: string;
    caloryLosingPlanTotal: number;
    caloryLosingPlanDaily: number;
  };
};

export type UserFormRegisterDetailsTrainer = {
  typesOfTraining: string[];
  levelOfExperience: string;
  trainerBody: {
    sertificates?: string[];
    merit?: string;
    readinessForPrivate?: boolean;
  };
};

export type UserUpdateData = {
  userName?: string;
  userAvatar?: string;
  password?: string;
  userGender?: string;
  birthDate?: string;
  description?: string;
  location?: string;
  levelOfExperience?: string;
  typesOfTraining?: string[];
  timeOfTraining?: string;
  caloryLosingPlanTotal?: number;
  caloryLosingPlanDaily?: number;
  readinessForTraining?: boolean;
  sertificates?: string[];
  trainerBody?: {
    sertificates?: string[];
    readinessForPrivate?: boolean;
  };
  merit?: string;
  readinessForPrivate?: boolean;
};
