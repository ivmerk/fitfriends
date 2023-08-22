import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FitnessUserRepository } from './fitness-user.repository.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { FitnessUserEntity } from './fitness-user.entity.js';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../types/user.interface.js';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './fitness-user.constant.js';
import { LoginUserDto } from './dto/loging-user.dto.js';
import jwtConfig from '../../config/jwt.config.js';
import { ConfigType } from '@nestjs/config';
import { createJWTPayload } from '../../common/jwt.js';
import { RefreshTokenService } from '../refresh-token/refresh-token.service.js';
import * as crypto from 'node:crypto';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserQuery } from './query/user.query.js';
import { UserFilter } from 'src/types/user-filter.interface.js';

@Injectable()
export class FitnessUserService {
  constructor(
    private readonly fitnessUserRepository: FitnessUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    const fitnessUser = {
      ...dto,
      passwordHash: '',
      orders: [],
      personalOrders: [],
      userBalance: [],
    };

    const existUser = await this.fitnessUserRepository.findByEmail(
      dto.userMail,
    );

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new FitnessUserEntity(fitnessUser).setPassword(
      dto.password,
    );
    return await this.fitnessUserRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.fitnessUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const fitnessUserEntity = new FitnessUserEntity(existUser);
    if (!(await fitnessUserEntity.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: number) {
    return this.fitnessUserRepository.findById(id);
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      }),
    };
  }

  public async getUsers(query: UserQuery): Promise<User[] | null> {
    const { limit, page } = query;
    const UserFilter: UserFilter = { ...query };
    return await this.fitnessUserRepository.find(limit, UserFilter, page);
  }

  public async updateUser(id: number, dto: UpdateUserDto) {
    const oldUser = await this.fitnessUserRepository.findById(id);
    if (oldUser) {
      const userEntity = new FitnessUserEntity({
        ...oldUser,
        ...dto,
      });
      userEntity.createdAt = oldUser.createdAt;
      return await this.fitnessUserRepository.update(id, userEntity);
    }
  }
}
