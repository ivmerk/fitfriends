import {
  ArrayMaxSize,
  Contains,
  IsArray,
  IsBoolean,
  IsISO8601,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { AUTH_USER_DATE_BIRTH_NOT_VALID } from '../fitness-user.constant.js';
import { ApiProperty } from '@nestjs/swagger';
import {
  CaloriesQtt,
  CaloriesQttDaily,
  MAXIMUM_TRAINING_TYPES_CHOICE,
  TrainerMeritLength,
  UserDescriptionLength,
  UserTitleLength,
  levelsOfExperience,
  trainerSertificateTypes,
  userGenders,
  userLocations,
} from '../../../common/constant.user.js';
import { durationOfTraining } from '../../../common/constant.training.js';
import { Type } from 'class-transformer';

class ClientBodyDto {
  @IsString()
  @IsIn(durationOfTraining)
  public timeOfTraining: string;

  @IsNumber()
  @Min(CaloriesQtt.Min)
  @Max(CaloriesQtt.Max)
  public caloryLosingPlanTotal: number;

  @IsNumber()
  @Min(CaloriesQttDaily.Min)
  @Max(CaloriesQttDaily.Max)
  public caloryLosingPlanDaily: number;

  @IsBoolean()
  public readinessForTraining: boolean;
}
class TrainerBodyDto {
  @IsString()
  @Contains(trainerSertificateTypes[0])
  public sertificate: string;

  @IsString()
  @MinLength(TrainerMeritLength.Min)
  @MaxLength(TrainerMeritLength.Max)
  public merit: string;

  @IsBoolean()
  public readinessForPrivate: boolean;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'User  name',
    example: 'Keks',
  })
  @IsString()
  @MinLength(UserTitleLength.Min)
  @MaxLength(UserTitleLength.Max)
  @IsOptional()
  public userName?: string;

  @IsString()
  @IsOptional()
  public userAvatar?: string;

  @IsString()
  @IsIn(userGenders)
  @IsOptional()
  public userGender?: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  @IsOptional()
  public birthDate?: string;

  @IsString()
  @MinLength(UserDescriptionLength.Min)
  @MaxLength(UserDescriptionLength.Max)
  @IsOptional()
  public description?: string;

  @IsString()
  @IsIn(userLocations)
  @IsOptional()
  public location?: string;

  @IsString()
  @IsOptional()
  public backgraundPicture?: string;

  @ValidateNested()
  @Type(() => ClientBodyDto)
  public clientBody?: ClientBodyDto;

  @ValidateNested()
  @Type(() => TrainerBodyDto)
  public trainerBody?: TrainerBodyDto;

  @IsString()
  @IsIn(levelsOfExperience)
  @IsOptional()
  public levelOfExperience?: string;

  @IsArray()
  @ArrayMaxSize(MAXIMUM_TRAINING_TYPES_CHOICE)
  @IsOptional()
  @IsString({ each: true })
  public typesOfTraining?: string[];
}
