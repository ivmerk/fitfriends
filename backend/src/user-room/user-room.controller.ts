import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { fillObject } from 'src/common/helpers';
import { UserRdo } from 'src/users/fitness-user/rdo/user-rdo';
import { UserBalanceRdo } from './rdo/user-balance.rdo';
import { FeedbackRdo } from './rdo/feedback.rdo';
import { OrderTrainingRdo } from './rdo/order-training.rdo';
import { PersonalOrderTrainingRdo } from './rdo/personal-order-training.rdo';
import { TrainingRdo } from 'src/training/fitness-training/rdo/training.rdo';
import { ApiResponse } from '@nestjs/swagger';
import { TrainingOrderFeedRdo } from './rdo/training-order-feed.rdo';

@Controller('user')
export class UserRoomController {
  constructor(private readonly userRoomService: UserRoomService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The friend  has been successfully added.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('friend/:id')
  public async addFriend(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    const user = await this.userRoomService.addFriend(payload, id);
    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The friend  has been successfully deleted.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('friend/:id')
  public async deleteFriend(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return await this.userRoomService.delFriend(payload.sub, id);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The friend list has been successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('friend')
  public async friends(@Req() { user: payload }: RequestWithTokenPayload) {
    const users = await this.userRoomService.showFriends(payload.sub);
    return { ...fillObject(UserRdo, users) };
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Users training successfully received.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('traning/:id')
  public async checkTraining(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    const userBalance = await this.userRoomService.showBalance(payload.sub, id);
    return fillObject(UserBalanceRdo, userBalance);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users training successfully used.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('traning/:id')
  public async buyTraning(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return await this.userRoomService.spendTraning(payload.sub, id);
  }

  @ApiResponse({
    type: FeedbackRdo,
    status: HttpStatus.OK,
    description: 'Traiings feedback successfully created.',
  })
  @Roles(UserRole.Client)
  @UseGuards(UserRolesGuard)
  @Post('feedback')
  public async addFeedback(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: CreateFeedbackDto,
  ) {
    const newFeedback = await this.userRoomService.postFeedback(
      payload.sub,
      dto,
    );
    return fillObject(FeedbackRdo, newFeedback);
  }

  @ApiResponse({
    type: OrderTrainingRdo,
    status: HttpStatus.OK,
    description: 'The training successfully ordered.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('order')
  public async makeOrder(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: CreateOrderDto,
  ) {
    const newOrder = await this.userRoomService.buyTrainings(payload.sub, dto);
    return fillObject(OrderTrainingRdo, newOrder);
  }

  @ApiResponse({
    type: PersonalOrderTrainingRdo,
    status: HttpStatus.OK,
    description: 'The personal training order successfully created.',
  })
  @Roles(UserRole.Client)
  @UseGuards(UserRolesGuard)
  @Post('personalorder/:id')
  public async makePersonalOrder(
    @Param('id', ParseIntPipe) trainerId: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    const newPersonalOrder = await this.userRoomService.buyPersonalTraining(
      payload.sub,
      trainerId,
    );
    return fillObject(PersonalOrderTrainingRdo, newPersonalOrder);
  }

  @ApiResponse({
    type: PersonalOrderTrainingRdo,
    status: HttpStatus.OK,
    description: 'The personal training order successfully showed',
  })
  @UseGuards(JwtAuthGuard)
  @Get('personalorder/:id')
  public async checkPersonalOrder(@Param('id', ParseIntPipe) orderId: number) {
    const personalOrder = await this.userRoomService.getPersonalOrder(orderId);
    return fillObject(PersonalOrderTrainingRdo, personalOrder);
  }

  @ApiResponse({
    type: PersonalOrderTrainingRdo,
    status: HttpStatus.OK,
    description: 'The personal training order list successfully showed',
  })
  @UseGuards(JwtAuthGuard)
  @Get('personalorder')
  public async checkTrainerPersonalOrders(
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    const personalOrders =
      await this.userRoomService.getPersonalOrderTrainerList(payload.sub);
    return fillObject(PersonalOrderTrainingRdo, personalOrders);
  }

  @ApiResponse({
    type: PersonalOrderTrainingRdo,
    status: HttpStatus.OK,
    description: 'The personal training order successfully changed',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('personalorder')
  public async aproovePersonalOrder(
    @Query(new ValidationPipe({ transform: true }))
    query: PersonalOrderTrainingStatusQuery,
  ) {
    const personalOrder = await this.userRoomService.changeStatus(query);
    return fillObject(PersonalOrderTrainingRdo, personalOrder);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The trainers training list successfully created',
  })
  @Roles(UserRole.Trainer)
  @UseGuards(UserRolesGuard)
  @Get('traininglist')
  public async getMyListTraining(
    @Query() query: TrainingListQuery,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    const trainings = await this.userRoomService.createTrainerTrainingList(
      query,
      payload,
    );
    return { ...fillObject(TrainingOrderFeedRdo, trainings) };
  }
}
