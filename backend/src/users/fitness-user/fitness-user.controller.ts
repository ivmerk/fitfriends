import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
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
import { FitnessUserService } from './fitness-user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { fillObject } from '../../common/helpers.js';
import { UserRdo } from './rdo/user-rdo.js';
import { LoginUserDto } from './dto/loging-user.dto.js';
import { ApiResponse } from '@nestjs/swagger';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard.js';
import { RequestWithUser } from '../../types/request-with-user.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { RequestWithTokenPayload } from '../../types/request-with-token-payloads.js';
import { AUTH_NOT_FOR_AUTH_USER } from './fitness-user.constant.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserQuery } from './query/user.query.js';
import { UserRole } from '../../types/user-role.enum.js';
import { Roles } from './decorators/user-roles.decorator.js';
import { UserRolesGuard } from './guards/user-roles.quard.js';

@Controller('auth')
export class FitnessUserController {
  constructor(private readonly fitnessUserService: FitnessUserService) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('/register')
  public async create(
    @Headers() headers: Record<string, string>,
    @Body() dto: CreateUserDto,
  ): Promise<UserRdo> {
    // if (headers.authorization) {
    //   throw new HttpException(
    //     { status: HttpStatus.BAD_REQUEST, error: AUTH_NOT_FOR_AUTH_USER },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
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
  public async login(@Body() dto: LoginUserDto): Promise<LoggedUserRdo> {
    const verifiedUser = await this.fitnessUserService.verifyUser(dto);
    const loggedUser = await this.fitnessUserService.createUserToken(
      verifiedUser,
    );
    return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    console.log('controller');
    return this.fitnessUserService.createUserToken(user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Users list complete.',
  })
  @Roles(UserRole.Client)
  @UseGuards(UserRolesGuard)
  @Get('/feed')
  public async feedLine(
    @Query(new ValidationPipe({ transform: true })) query: UserQuery,
  ) {
    const users = await this.fitnessUserService.getUsers(query);
    return { ...fillObject(UserRdo, users) };
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User updated.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  public async update(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: UpdateUserDto,
  ) {
    const id = payload.sub;
    const updatedUser = await this.fitnessUserService.updateUser(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User by id received',
  })
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  public async show(@Param('id', ParseIntPipe) id: number) {
    const user = await this.fitnessUserService.getUser(id);
    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Checkig token availibility',
  })
  @UseGuards(JwtAuthGuard)
  @Get('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}
