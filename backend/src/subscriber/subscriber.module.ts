import { Module } from '@nestjs/common';
import { FitnessUserModule } from 'src/users/fitness-user/fitness-user.module';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberService } from './subscriber.service';
import { getMailerAsyncOptions } from 'src/common/mail';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    FitnessUserModule,
    MailerModule.forRootAsync(getMailerAsyncOptions('application.mail')),
  ],
  providers: [SubscriberRepository, SubscriberService],
})
export class SubscriberModule {}
