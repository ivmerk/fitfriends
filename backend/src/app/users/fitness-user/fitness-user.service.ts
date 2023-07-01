import { Injectable } from '@nestjs/common';
import { FitnessUserRepository } from './fitness-user.repository.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { FitnessUserEntity } from './fitness-user.entity.js';
import { User } from '../../../types/user.interface.js';

@Injectable()
export class FitnessUserService {
  constructor(private readonly fitnessUserRepository: FitnessUserRepository) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    const userEntity = new FitnessUserEntity({
      ...dto,
      orders: [],
      personalOrders: [],
      userBalance: [],
    });
    return this.fitnessUserRepository.create(userEntity);
  }
}
