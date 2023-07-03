import { Module } from '@nestjs/common';
import { AuthentificationController } from './authentification.controller.js';
import { AuthentificationService } from './authentification.service.js';
import { FitnessUserModule } from '../fitness-user/fitness-user.module.js';

@Module({
  imports: [FitnessUserModule],
  controllers: [AuthentificationController],
  providers: [AuthentificationService],
})
export class AuthentificationModule {}
