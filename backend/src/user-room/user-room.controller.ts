import {
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

@Controller('user')
export class UserRoomController {
  constructor(private readonly userRoomService: UserRoomService) {}

  @UseGuards(JwtAuthGuard)
  @Post('friend/:id')
  public async addFriend(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    if (payload.userRole !== UserRole.Client) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: AUTH_USER_ONLY_CLIENT_PERMIT },
        HttpStatus.FORBIDDEN,
      );
    }
    return this.userRoomService.addFriend(payload.sub, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('friend/:id')
  public async deleteFriend(
    @Param('id', ParseIntPipe) id: number,
    @Req() { user: payload }: RequestWithTokenPayload,
  ) {
    if (payload.userRole !== UserRole.Client) {
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: AUTH_USER_ONLY_CLIENT_PERMIT },
        HttpStatus.FORBIDDEN,
      );
    }
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
}
