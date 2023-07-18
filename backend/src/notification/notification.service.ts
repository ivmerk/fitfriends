import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { Notification } from 'src/types/notification.interface';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationEntity } from './notification.entity';
import { FitnessUserRepository } from '../users/fitness-user/fitness-user.repository.js';
import { NOTIFICAION_NOT_FOUND, USER_NOT_FOUND } from './notification.constant';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly fitnessUserRepository: FitnessUserRepository,
  ) {}

  public async getNotification(userId: number): Promise<Notification[]> {
    return await this.notificationRepository.findByUserId(userId);
  }

  public async makeNewNotification(
    dto: CreateNotificationDto,
    askingUserId: number,
  ): Promise<Notification> {
    const targetUser = await this.fitnessUserRepository.findById(
      dto.targetUserId,
    );
    if (!targetUser) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: USER_NOT_FOUND },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const entity = new NotificationEntity({ ...dto, askingUserId });
      return await this.notificationRepository.create(entity);
    }
  }

  public async delNotification(notificationId: number): Promise<void> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );
    if (!notification) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: NOTIFICAION_NOT_FOUND },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.notificationRepository.destroy(notificationId);
    }
  }
}
