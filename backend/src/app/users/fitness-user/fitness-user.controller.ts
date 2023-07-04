import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FitnessUserService } from './fitness-user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { fillObject } from '../../../common/helpers.js';
import { UserRdo } from './rdo/user-rdo.js';
import { LoginUserDto } from './dto/loging-user.dto.js';
import { ApiResponse } from '@nestjs/swagger';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard.js';
import { RequestWithUser } from '../../../types/request-with-user.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { RequestWithTokenPayload } from '../../../types/request-with-token-payloads.js';
import { AUTH_NOT_FOR_AUTH_USER } from './fitness-user.constant.js';

@Controller('auth')
export class FitnessUserController {
  constructor(private readonly fitnessUserService: FitnessUserService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('/register')
  async create(
    @Request() { user: payload }: RequestWithTokenPayload,
    @Body() dto: CreateUserDto
  ) {
    console.log(payload?.email);
    if (payload?.email) {
      throw new NotFoundException(AUTH_NOT_FOR_AUTH_USER);
    }
    const newUser = await this.fitnessUserService.createUser(dto);
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.fitnessUserService.verifyUser(dto);
    const loggedUser = await this.fitnessUserService.createUserToken(
      verifiedUser
    );
    return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.fitnessUserService.createUserToken(user!);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    console.log(payload?.email);
    return payload;
  }
}
