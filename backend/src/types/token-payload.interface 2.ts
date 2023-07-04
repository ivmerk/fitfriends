import { UserRoleType } from './user-role.enum';

export interface TokenPayload {
  sub?: number;
  email: string;
  userRole: UserRoleType;
  name: string;
}
