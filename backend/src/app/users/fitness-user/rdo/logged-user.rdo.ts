import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public userId!: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local',
  })
  @Expose()
  public userEmail!: string;

  @ApiProperty({
    description: 'Access token',
    example: 'user@user.local',
  })
  @Expose()
  public accessToken!: string;
}
