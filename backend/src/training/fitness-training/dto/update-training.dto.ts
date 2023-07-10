import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Rating } from 'src/common/constant';
import {
  TrainingDescriptionLength,
  TrainingTitleLength,
  durationOfTraining,
  trainingGender,
  typesOfTraning,
} from 'src/common/constant.training';
import { CaloriesQttDaily, levelsOfExperience } from 'src/common/constant.user';

export default class UpdateTrainingDto {
  @ApiProperty({
    description: 'Training  title',
    example: 'Бокс 11 июля с тренером - Володей Кличко',
  })
  @IsString()
  @MinLength(TrainingTitleLength.Min)
  @MaxLength(TrainingTitleLength.Max)
  public title?: string;

  @ApiProperty({
    description: 'Traning backgraund picture filename',
    example: 'myface.jpg',
  })
  @IsString()
  public backgroundPicture?: string;

  @ApiProperty({
    description: 'Client level of experience',
    example: 'любитель',
  })
  @IsString()
  @IsIn(levelsOfExperience)
  public levelOfUser?: string;

  @ApiProperty({
    description: 'User types of traning',
    example: 'бокс',
  })
  @IsString()
  @IsIn(typesOfTraning)
  public typeOfTraining?: string;

  @ApiProperty({
    description: 'Duration of traning',
    example: '10-30 мин',
  })
  @IsString()
  @IsIn(durationOfTraining)
  public duration?: string;

  @ApiProperty({
    description: 'Price of traning',
    example: '100',
  })
  @IsNumber()
  @Min(0)
  public price?: number;

  @ApiProperty({
    description: 'Price of traning',
    example: '100',
  })
  @IsNumber()
  @Min(CaloriesQttDaily.Min)
  @Max(CaloriesQttDaily.Max)
  public caloriesQtt?: number;

  @ApiProperty({
    description: 'User description',
    example: 'I like jump too much',
  })
  @IsString()
  @MinLength(TrainingDescriptionLength.Min)
  @MaxLength(TrainingDescriptionLength.Max)
  public description?: string;

  @ApiProperty({
    description: 'Gender of client',
    example: 'для мужчин',
  })
  @IsString()
  @IsIn(trainingGender)
  public trainingGender?: string;

  @ApiProperty({
    description: 'FileName of video file',
    example: 'box.avi',
  })
  @IsString()
  public video?: string;

  @ApiProperty({
    description: 'Rating of traning',
    example: '5',
  })
  @IsNumber()
  @Min(Rating.Min)
  @Max(Rating.Max)
  public rating?: number;

  @ApiProperty({
    description: 'Base Id of trainer',
    example: '5',
  })
  @IsNumber()
  public trainerId?: number;

  @ApiProperty({
    description: 'Is promo traner',
    example: 'true',
  })
  @IsBoolean()
  public isPromo?: boolean;
}
