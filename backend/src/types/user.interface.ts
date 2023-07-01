import { OrderTraining } from './order-training.interface';
import { PersonalOrderTraining } from './personal-order-training.interface';
import { UserBalance } from './user-balance.interface';
import { UserRoleType } from './user-role.enum';

export interface User {
  userId?: number;
  userName: string;
  userMail: string;
  userAvatar?: string;
  passwordHash: string;
  userGender: string;
  birthDate: string;
  userRole: UserRoleType;
  description: string;
  location: string;
  backgraundPicture: string;
  createdAt?: Date;
  clientBody?: ClientBody | null;
  trainerBody?: TrainerBody | null;
  levelOfExperience: string;
  typesOfTraning: string[];
  orders?: OrderTraining[];
  personalOrders?: PersonalOrderTraining[];
  userBalance?: UserBalance[];
  friends?: number[];
}

export interface ClientBody {
  clientBodyId?: number;
  userId?: number;
  timeOfTraining: string;
  caloryLosingPlanTotal: number;
  caloryLosingPlanDaily: number;
  readinessForTraining: boolean;
}

export interface TrainerBody {
  trainerBodyId?: number;
  userId?: number;
  sertificate: string;
  merit: string;
  readinessForPrivate: boolean;
}
