import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRoomService } from './user-room.service';
import { JwtAuthGuard } from 'src/users/fitness-user/guards/jwt-auth.guard';
import { RequestWithTokenPayload } from 'src/types/request-with-token-payloads';
import { UserRole } from 'src/types/user-role.enum';
import { AUTH_USER_ONLY_CLIENT_PERMIT } from 'src/users/fitness-user/fitness-user.constant';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('user')
export class UserRoomController {
  constructor(private readonly userRoomService: UserRoomService) {}

  @UseGuards(JwtAuthGuard)
  @Post('friend/:id')
  public async addFriend(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return this.userRoomService.addFriend(payload, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('friend/:id')
  public async deleteFriend(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    // if (payload.userRole !== UserRole.Client) {
    //   throw new HttpException(
    //     { status: HttpStatus.FORBIDDEN, error: AUTH_USER_ONLY_CLIENT_PERMIT },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
    return this.userRoomService.delFriend(payload.sub, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('friend')
  public async friends(@Req() { user: payload }: RequestWithTokenPayload) {
    if (payload.userRole !== UserRole.Client) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: AUTH_USER_ONLY_CLIENT_PERMIT },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.userRoomService.showFriends(payload.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('traning/:id')
  public async checkTraining(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return this.userRoomService.showBalance(payload.sub, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('traning/:id')
  public async buyTraning(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    return this.userRoomService.spendTraning(payload.sub, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('feedback')
  public async addFeedback(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: CreateFeedbackDto,
  ) {
    if (payload.userRole !== UserRole.Client) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: AUTH_USER_ONLY_CLIENT_PERMIT },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.userRoomService.postFeedback(payload.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('order')
  public async makeOrder(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: CreateOrderDto,
  ) {
    this.userRoomService.buyTrainings(payload.sub, dto);
  }
}
