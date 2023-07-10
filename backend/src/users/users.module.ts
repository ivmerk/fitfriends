import { Module } from '@nestjs/common';
import { FitnessUserModule } from './fitness-user/fitness-user.module.js';
import { UploaderModule } from '../uploader/uploader.module.js';

@Module({
  imports: [FitnessUserModule, UploaderModule],
})
export class UsersModule {}
