import { Expose } from 'class-transformer';

export class NotificationRdo {
  @Expose()
  public notificationId: number;

  @Expose()
  public targetUserId: number;

  @Expose()
  public typesOfNotification: string;

  @Expose()
  public askingUserId: number;
}
