import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubscriberRepository } from './subscriber.repository';
import { SubscriberEntity } from './subscriber.entity';
import { FitnessUserRepository } from 'src/users/fitness-user/fitness-user.repository';
import { TRAINER_NOT_FOUND } from './subscriber.constant';
import { TokenPayload } from 'src/types/token-payload.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SubscriberService {
  constructor(
    private readonly subscriberRepository: SubscriberRepository,
    private readonly fitnessUserRepository: FitnessUserRepository,
    private readonly mailerServer: MailerService,
  ) {}

  public async createSubscriber(trainerId: number, payload: TokenPayload) {
    const { email, name } = payload;
    const trainer = await this.fitnessUserRepository.findById(trainerId);
    if (!trainer) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: TRAINER_NOT_FOUND },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const entity = new SubscriberEntity({ email, name, trainerId });
      return await this.subscriberRepository.create(entity);
    }
  }

  public async sendMail(payload: TokenPayload) {
    const { sub, name } = payload;
    const subscribers = await this.subscriberRepository.findByTrainerId(sub);
    await Promise.all(
      subscribers.map(async (item) => {
        await this.mailerServer.sendMail({
          to: item.email,
          subject: 'New training',
          template: '../../new-training',
          context: {
            user: `${item.name} `,
            trainer: `${name}`,
          },
        });
      }),
    );
  }
}
