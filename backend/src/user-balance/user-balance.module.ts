import { Module } from '@nestjs/common';
import { UserBalanceRepository } from './user-balance.repository';

@Module({
  providers: [UserBalanceRepository],
})
export class UserBalanceModule {}
