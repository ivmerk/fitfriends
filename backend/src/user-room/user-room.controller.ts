import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserRoomService } from './user-room.service';
import { JwtAuthGuard } from 'src/users/fitness-user/guards/jwt-auth.guard';
import { RequestWithTokenPayload } from 'src/types/request-with-token-payloads';
import { UserRole } from 'src/types/user-role.enum';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { PersonalOrderTrainingStatusQuery } from './query/personal-order-trainpg-status.query';
import { TrainingListQuery } from './query/training-list.query';
import { Roles } from 'src/users/fitness-user/decorators/user-roles.decorator';
import { UserRolesGuard } from 'src/users/fitness-user/guards/user-roles.quard';

@Controller('user')
export class UserRoomController {
  constructor(private readonly userRoomService: UserRoomService) {}

  @UseGuards(JwtAuthGuard)
  @Post('friend/:id')
  public async addFriend(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return await this.userRoomService.addFriend(payload, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('friend/:id')
  public async deleteFriend(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return await this.userRoomService.delFriend(payload.sub, id);
  }

  @Roles(UserRole.Client)
  @UseGuards(UserRolesGuard)
  @Get('friend')
  public async friends(@Req() { user: payload }: RequestWithTokenPayload) {
    return await this.userRoomService.showFriends(payload.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('traning/:id')
  public async checkTraining(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return await this.userRoomService.showBalance(payload.sub, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('traning/:id')
  public async buyTraning(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return await this.userRoomService.spendTraning(payload.sub, id);
  }

  @Roles(UserRole.Client)
  @UseGuards(UserRolesGuard)
  @Post('feedback')
  public async addFeedback(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: CreateFeedbackDto,
  ) {
    return await this.userRoomService.postFeedback(payload.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('order')
  public async makeOrder(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: CreateOrderDto,
  ) {
    return await this.userRoomService.buyTrainings(payload.sub, dto);
  }

  @Roles(UserRole.Client)
  @UseGuards(UserRolesGuard)
  @Post('personalorder/:id')
  public async makePersonalOrder(
    @Param('id', ParseIntPipe) trainerId: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return await this.userRoomService.buyPersonalTraining(
      payload.sub,
      trainerId,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('personalorder/:id')
  public async checkPersonalOrder(@Param('id', ParseIntPipe) orderId: number) {
    return await this.userRoomService.getPersonalOrder(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('personalorder')
  public async aproovePersonalOrder(
    @Query(new ValidationPipe({ transform: true }))
    query: PersonalOrderTrainingStatusQuery,
  ) {
    return await this.userRoomService.changeStatus(query);
  }

  @Roles(UserRole.Trainer)
  @UseGuards(UserRolesGuard)
  @Get('traininglist')
  public async getMyListTraining(
    @Query() query: TrainingListQuery,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return await this.userRoomService.createTrainerTrainingList(query, payload);
  }
}
