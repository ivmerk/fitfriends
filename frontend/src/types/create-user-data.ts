import { UserRoleType } from './user-role.enum';

export type CreateUserData = {
  userName: string;
  userMail: string;
  userAvatar: string;
  password: string;
  userGender: string;
  birthDate: string;
  userRole: UserRoleType;
  location: string;
};
