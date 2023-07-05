import { TokenPayload } from '../types/token-payload.interface';
import { User } from '../types/user.interface';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.userId!,
    email: user.userMail,
    userRole: user.userRole,
    name: user.userName,
  };
}
