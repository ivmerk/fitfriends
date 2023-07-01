import { Body, Controller, Post } from '@nestjs/common';
import { FitnessUserService } from './fitness-user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { fillObject } from '../../../common/helpers.js';
import { UserRdo } from './rdo/user-rdo.js';

@Controller('user')
export class FitnessUserController {
  constructor(private readonly fitnessUserService: FitnessUserService) {}

  @Post('/')
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.fitnessUserService.createUser(dto);
    return fillObject(UserRdo, newUser);
  }
}
