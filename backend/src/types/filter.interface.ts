import { UserRoleType } from './user-role.enum';

export interface Filter {
  locations: string[];
  levelOfExperience: string;
  typesOfTraining: string[];
  userRole: UserRoleType;
}
