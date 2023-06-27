import { User } from './user.interface';

export interface Notification {
  notificationId?: number;
  user: User;
  text: string;
}
