import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/users/fitness-user/guards/jwt-auth.guard';
import { RequestWithTokenPayload } from 'src/types/request-with-token-payloads';
import { NotificationRdo } from './rdo/notification.rdo';
import { fillObject } from 'src/common/helpers';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async show(@Req() { user: payload }: RequestWithTokenPayload) {
    const notifications = await this.notificationService.getNotification(
      payload.sub,
    );
    return { ...fillObject(NotificationRdo, notifications) };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async create(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: CreateNotificationDto,
  ) {
    const newNotification = await this.notificationService.makeNewNotification(
      dto,
      payload.sub,
    );
    return fillObject(NotificationRdo, newNotification);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    await this.notificationService.delNotification(id);
  }
}
