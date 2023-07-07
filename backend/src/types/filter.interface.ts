import { UserRoleType } from './user-role.enum';

export interface Filter {
  location: string;
  levelOfExperience: string;
  typesOfTraning: string;
  userRole: UserRoleType;
}
