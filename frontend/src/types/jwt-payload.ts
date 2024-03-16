import { UserRole } from "./user-role.enum";

export type JWTPayload = {
  sub: number;
  email: string;
  userRole: UserRole;
  name: string;
  iat: number;
  exp: number;
}
