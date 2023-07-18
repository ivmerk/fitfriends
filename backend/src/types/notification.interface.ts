export interface Notification {
  notificationId?: number;
  targetUserId: number;
  typesOfNotification: string;
  askingUserId: number;
}
