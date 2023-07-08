import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
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
import {
  AUTH_NOT_FOR_AUTH_USER,
  AUTH_USER_ONLY_CLIENT_PERMIT,
} from './fitness-user.constant.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserQuery } from './query/user.query.js';
import { UserRole, UserRoleType } from '../../types/user-role.enum.js';

@Controller('auth')
export class FitnessUserController {
  constructor(private readonly fitnessUserService: FitnessUserService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('/register')
  public async create(
    @Headers() headers: Record<string, string>,
    @Body() dto: CreateUserDto,
  ) {
    if (headers.authorization) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: AUTH_NOT_FOR_AUTH_USER },
        HttpStatus.BAD_REQUEST,
      );
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
      verifiedUser,
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
    return this.fitnessUserService.createUserToken(user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/feed')
  public async feedLine(
    // @Req() { user: payload }: RequestWithTokenPayload,
    // @Query() query: UserQuery,
    @Query('locations', new ParseArrayPipe({ items: String, separator: ',' }))
    locations: string[],
    @Query(
      'typesOfTraining',
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    typesOfTraining: string[],
    @Query('limit', ParseIntPipe) limit: number,
    @Query('userRole') userRole: UserRoleType,
    @Query('levelOfExperience') levelOfExperience: string,
    @Query('page', ParseIntPipe) page: number,
    // query: UserQuery,
  ) {
    // console.log(payload.userRole);
    const query = {
      locations,
      limit,
      page,
      userRole,
      levelOfExperience,
      typesOfTraining,
    };
    console.log(query);
    // if (payload.userRole !== UserRole.Client) {
    //   throw new HttpException(
    //     { status: HttpStatus.FORBIDDEN, error: AUTH_USER_ONLY_CLIENT_PERMIT },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
    return await this.fitnessUserService.getUsers(query);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  public async update(
    @Req() { user: payload }: RequestWithTokenPayload,
    @Body() dto: UpdateUserDto,
  ) {
    const id = payload.sub;
    const updatedUser = await this.fitnessUserService.updateUser(id, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', ParseIntPipe) id: number) {
    const user = await this.fitnessUserService.getUser(id);
    return {
      ...fillObject(UserRdo, user),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}
