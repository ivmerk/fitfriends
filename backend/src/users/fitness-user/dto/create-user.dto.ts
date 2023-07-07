import {
  ArrayMaxSize,
  Contains,
  IsArray,
  IsBoolean,
  IsEmail,
  IsISO8601,
  IsIn,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { UserRoleType, userRoleTypes } from '../../../types/user-role.enum.js';
import { ClientBody, TrainerBody } from '../../../types/user.interface.js';
import {
  AUTH_USER_DATE_BIRTH_NOT_VALID,
  AUTH_USER_EMAIL_NOT_VALID,
} from '../fitness-user.constant.js';
import { ApiProperty } from '@nestjs/swagger';
import {
  CaloriesQtt,
  CaloriesQttDaily,
  MAXIMUM_TRAINING_TYPES_CHOICE,
  TrainerMeritLength,
  UserDescriptionLength,
  UserPasswordLength,
  UserTitleLength,
  levelsOfExperience,
  trainerSertificateTypes,
  userGenders,
  userLocations,
} from '../../../common/constant.user.js';
import { durationOfTraining } from '../../../common/constant.training.js';
import { Type } from 'class-transformer';

class ClientBodyDto implements ClientBody {
  @ApiProperty({
    description: 'User  time of training',
    example: '30-40 минут',
  })
  @IsString()
  @IsIn(durationOfTraining)
  public timeOfTraining!: string;

  @ApiProperty({
    description: 'User  calory losing plan total',
    example: '1000',
  })
  @IsNumber()
  @Min(CaloriesQtt.Min)
  @Max(CaloriesQtt.Max)
  public caloryLosingPlanTotal!: number;

  @ApiProperty({
    description: 'User  calory losing plan daily',
    example: '1000',
  })
  @IsNumber()
  @Min(CaloriesQttDaily.Min)
  @Max(CaloriesQttDaily.Max)
  public caloryLosingPlanDaily!: number;

  @IsBoolean()
  public readinessForTraining!: boolean;
}
class TrainerBodyDto implements TrainerBody {
  @IsString()
  @Contains(trainerSertificateTypes[0])
  public sertificate!: string;

  @IsString()
  @MinLength(TrainerMeritLength.Min)
  @MaxLength(TrainerMeritLength.Max)
  public merit!: string;

  @IsBoolean()
  public readinessForPrivate!: boolean;
}

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
  public userAvatar?: string;

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
    description: 'User description',
    example: 'I like jump too much',
  })
  @IsString()
  @MinLength(UserDescriptionLength.Min)
  @MaxLength(UserDescriptionLength.Max)
  public description!: string;

  @ApiProperty({
    description: 'User location',
    example: 'пионерская',
  })
  @IsString()
  @IsIn(userLocations)
  public location!: string;

  @ApiProperty({
    description: 'Usercard backgraund filename',
    example: 'myforrest.jpg',
  })
  @IsString()
  public backgraundPicture!: string;

  @ValidateNested()
  @Type(() => ClientBodyDto)
  public clientBody?: ClientBodyDto;

  @ValidateNested()
  @Type(() => TrainerBodyDto)
  public trainerBody?: TrainerBodyDto;

  @ApiProperty({
    description: 'User level of experience',
    example: 'любитель',
  })
  @IsString()
  @IsIn(levelsOfExperience)
  public levelOfExperience!: string;

  @ApiProperty({
    description: 'User types of traning',
    example: 'бокс',
  })
  @IsArray()
  @ArrayMaxSize(MAXIMUM_TRAINING_TYPES_CHOICE)
  public typesOfTraning!: string[];
}
