import { UserRoleType } from './user-role.enum';

export interface UserFilter {
  locations: string[];
  levelOfExperience: string;
  typesOfTraining: string[];
  userRole: UserRoleType;
}
