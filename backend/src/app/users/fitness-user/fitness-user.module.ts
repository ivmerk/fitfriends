import { Module } from '@nestjs/common';
import { FitnessUserController } from './fitness-user.controller.js';
import { FitnessUserRepository } from './fitness-user.repository.js';
import { FitnessUserService } from './fitness-user.service.js';

@Module({
  controllers: [FitnessUserController],
  providers: [FitnessUserRepository, FitnessUserService],
  exports: [FitnessUserRepository],
})
export class FitnessUserModule {}
