import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { JwtAuthGuard } from 'src/users/fitness-user/guards/jwt-auth.guard';
import { RequestWithTokenPayload } from 'src/types/request-with-token-payloads';

@Controller('subscriber')
export class SubscriberController {
  constructor(public readonly subscriberService: SubscriberService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  public async subscribe(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return await this.subscriberService.createSubscriber(id, payload);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async sendAnnonce(@Req() { user: payload }: RequestWithTokenPayload) {
    return await this.subscriberService.sendMail(payload);
  }
}
