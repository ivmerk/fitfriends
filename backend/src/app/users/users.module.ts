import { Module } from '@nestjs/common';
import { FitnessUserModule } from './fitness-user/fitness-user.module.js';

@Module({
  imports: [FitnessUserModule],
})
export class UsersModule {}
