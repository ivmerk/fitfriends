import { UserRole } from './user-role.enum';

export interface MyToken {
  sub: number;
  email: string;
  userRole: UserRole;
  name: string;
  iat: number;
  exp: number;
}
