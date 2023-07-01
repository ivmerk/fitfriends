import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { FitnessUserModule } from './users/fitness-user/fitness-user.module.js';

@Module({
  imports: [PrismaModule, FitnessUserModule],
})
export class AppModule {}
