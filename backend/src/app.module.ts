import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import uploaderConfig from './config/uploader.config';
import TrainingModule from './training/training.module';
import { OrderTrainingModule } from './order-training/order-training.module';
import { UserRoomModule } from './user-room/user-room.module';
import { UserFriendModule } from './user-friend/user-friend.module';

const ENV_USERS_FILE_PATH = '../.env';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    TrainingModule,
    UserRoomModule,
    UserFriendModule,
    OrderTrainingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, uploaderConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class AppModule {}
