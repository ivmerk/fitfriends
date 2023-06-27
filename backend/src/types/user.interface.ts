import { UserRole } from './user-role.enum';

export interface User {
  userId?: number;
  userName: string;
  userMail: string;
  userAvatar: string;
  password: string;
  userGender: string;
  birthDate?: Date;
  userRole: UserRole;
  description: string;
  location: string;
  backgraundPicture: string;
  createdAt?: Date;
  userBody?: UserBody;
  trainerBody?: TrainerBody;
  levelOfExperience: string;
  typesOfTraning: string[];
}

export interface UserBody {
  id?: number;
  timeOfTraining: string;
  caloryLosingPlanTotal: string;
  caloryLosingPlanDiurnal: string;
  readinessForTraining: boolean;
}

export interface TrainerBody {
  id?: number;
  sertificate: string;
  merit: string;
  readinessForPrivate: boolean;
}
