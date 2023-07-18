import { CRUDRepository } from 'src/types/crud-repository';
import { NotificationEntity } from './notification.entity';
import { Notification } from 'src/types/notification.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationRepository
  implements CRUDRepository<NotificationEntity, number, Notification>
{
  constructor(private readonly prisma: PrismaService) {}
  public async create(item: NotificationEntity): Promise<Notification> {
    const entity = item.toObject();
    return await this.prisma.notification.create({ data: { ...entity } });
  }

  public async destroy(notificationId: number): Promise<void> {
    await this.prisma.notification.delete({ where: { notificationId } });
  }

  public async findById(notificationId: number): Promise<Notification> {
    return await this.prisma.notification.findFirst({
      where: { notificationId },
    });
  }

  public async findByUserId(userId: number): Promise<Notification[]> {
    return await this.prisma.notification.findMany({
      where: { targetUserId: userId },
    });
  }
}
