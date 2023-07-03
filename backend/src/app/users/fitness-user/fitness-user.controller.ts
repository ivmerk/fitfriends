import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
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

@Controller('auth')
export class FitnessUserController {
  constructor(private readonly fitnessUserService: FitnessUserService) {}

  @Post('/register')
  async create(@Body() dto: CreateUserDto) {
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
    console.log(dto);
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
}
