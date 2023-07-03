// import { ConfigService } from '@nestjs/config';
import { FitnessUserRepository } from '../fitness-user/fitness-user.repository.js';
// import { JwtService } from '@nestjs/jwt';
import { FitnessUserEntity } from '../fitness-user/fitness-user.entity.js';
import { User } from '../../../types/user.interface.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/loging-user.dto.js';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND,
  AUTH_USER_PASSWORD_WRONG,
} from './authentification.constant.js';
// import { TokenPayload } from '../../../types/token-payload.interface.js';

@Injectable()
export class AuthentificationService {
  constructor(
    private readonly fitnessUserRepository: FitnessUserRepository // private readonly jwtService: JwtService // private readonly configService: ConfigService,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    console.log(await this.fitnessUserRepository);

    const fitnessUser = {
      ...dto,
      orders: [],
      personalOrders: [],
      userBalance: [],
    };

    const existUser = await this.fitnessUserRepository.findByEmail(
      dto.userMail
    );

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new FitnessUserEntity(fitnessUser);
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

    return fitnessUserEntity.toObject();
  }

  public async getUser(id: number) {
    return this.fitnessUserRepository.findById(id);
  }

  // public async createUserToken(user: User) {
  //   const payload: TokenPayload = {
  //     sub: user.userId,
  //     email: user.userMail,
  //     userRole: user.userRole,
  //     name: user.userName,
  //   };

  //   return {
  //     accessToken: await this.jwtService.signAsync(payload),
  //   };
  // }
}
