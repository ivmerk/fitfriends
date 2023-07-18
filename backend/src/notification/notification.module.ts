import { Module } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { FitnessUserModule } from 'src/users/fitness-user/fitness-user.module';

@Module({
  imports: [FitnessUserModule],
  providers: [NotificationRepository, NotificationService],
  controllers: [NotificationController],
  exports: [NotificationRepository],
})
export class NotificationModule {}
