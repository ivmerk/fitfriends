import {
  IsEmail,
  IsISO8601,
  IsIn,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoleType, userRoleTypes } from '../../../types/user-role.enum.js';
import {
  AUTH_USER_DATE_BIRTH_NOT_VALID,
  AUTH_USER_EMAIL_NOT_VALID,
} from '../fitness-user.constant.js';
import { ApiProperty } from '@nestjs/swagger';
import {
  UserPasswordLength,
  UserTitleLength,
  userGenders,
  userLocations,
} from '../../../common/constant.user.js';

export class CreateUserDto {
  @ApiProperty({
    description: 'User  name',
    example: 'Keks',
  })
  @IsString()
  @MinLength(UserTitleLength.Min)
  @MaxLength(UserTitleLength.Max)
  public userName!: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public userMail!: string;

  @ApiProperty({
    description: 'User avatar filename',
    example: 'myface.jpg',
  })
  @IsString()
  public userAvatar!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @MinLength(UserPasswordLength.Min)
  @MaxLength(UserPasswordLength.Max)
  public password!: string;

  @ApiProperty({
    description: 'User gender',
    example: 'мужской',
  })
  @IsString()
  @IsIn(userGenders)
  public userGender!: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  public birthDate!: string;

  @ApiProperty({
    description: 'User gender',
    example: 'мужской',
  })
  @IsIn(userRoleTypes)
  public userRole!: UserRoleType;

  @ApiProperty({
    description: 'User location',
    example: 'пионерская',
  })
  @IsString()
  @IsIn(userLocations)
  public location!: string;
}
