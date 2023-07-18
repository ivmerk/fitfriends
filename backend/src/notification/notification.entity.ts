import { Entity } from 'src/types/entity.interface';
import { Notification } from 'src/types/notification.interface';

export class NotificationEntity
  implements Entity<NotificationEntity>, Notification
{
  public targetUserId: number;
  public typesOfNotification: string;
  public askingUserId: number;

  constructor(notification: Notification) {
    this.fillEntity(notification);
  }

  public fillEntity(entity: Notification) {
    this.targetUserId = entity.targetUserId;
    this.typesOfNotification = entity.typesOfNotification;
    this.askingUserId = entity.askingUserId;
  }

  public toObject(): NotificationEntity {
    return { ...this };
  }
}
