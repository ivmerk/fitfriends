import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { fillObject } from '../../../common/helpers.js';
import { UserRdo } from './rdo/user-rdo.js';
import { AuthentificationService } from './authentification.service.js';
import { ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from './dto/loging-user.dto.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';

@Controller('auth')
export class AuthentificationController {
  constructor(private readonly authService: AuthentificationService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('/register')
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.createUser(dto);
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
    // const verifiedUser = await this.authService.verifyUser(dto);
    // const loggedUser = await this.authService.createUserToken(verifiedUser);
    // return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
  }
}
