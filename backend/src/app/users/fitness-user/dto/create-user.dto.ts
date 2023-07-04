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
import {
  UserRoleType,
  userRoleTypes,
} from '../../../../types/user-role.enum.js';
import { ClientBody, TrainerBody } from '../../../../types/user.interface.js';
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
} from '../../../../common/constant.user.js';
import { durationOfTraining } from '../../../../common/constant.training.js';
import { Type } from 'class-transformer';

class ClientBodyDto implements ClientBody {
  @IsString()
  @IsIn(durationOfTraining)
  public timeOfTraining!: string;

  @IsNumber()
  @Min(CaloriesQtt.Min)
  @Max(CaloriesQtt.Max)
  public caloryLosingPlanTotal!: number;

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

  @IsString()
  public userAvatar?: string;

  @IsString()
  @MinLength(UserPasswordLength.Min)
  @MaxLength(UserPasswordLength.Max)
  public password!: string;

  @IsString()
  @IsIn(userGenders)
  public userGender!: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  public birthDate!: string;

  @IsIn(userRoleTypes)
  public userRole!: UserRoleType;

  @IsString()
  @MinLength(UserDescriptionLength.Min)
  @MaxLength(UserDescriptionLength.Max)
  public description!: string;

  @IsString()
  @IsIn(userLocations)
  public location!: string;
  public backgraundPicture!: string;

  @ValidateNested()
  @Type(() => ClientBodyDto)
  public clientBody?: ClientBodyDto;

  @ValidateNested()
  @Type(() => TrainerBodyDto)
  public trainerBody?: TrainerBodyDto;

  @IsString()
  @IsIn(levelsOfExperience)
  public levelOfExperience!: string;

  @IsArray()
  @ArrayMaxSize(MAXIMUM_TRAINING_TYPES_CHOICE)
  public typesOfTraning!: string[];
}
