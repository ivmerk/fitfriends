import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Id of user which will responce',
    example: '100',
  })
  @IsNumber()
  public targetUserId: number;

  @ApiProperty({
    description: 'Type of notification',
    example: 'добавить в друзья',
  })
  @IsString()
  @IsIn([
    'добавить в друзья',
    'пригласить на тренировку',
    'запрос на персональную тренировку',
  ])
  public typesOfNotification: string;
}
