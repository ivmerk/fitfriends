import { Transform } from 'class-transformer';
import { DEFAULT_USER_COUNT_LIMIT } from '../fitness-user.constant';
import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { levelsOfExperience } from 'src/common/constant.user';

export class UserQuery {
  @Transform(({ value }) => +value || DEFAULT_USER_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_USER_COUNT_LIMIT;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.toString().split(','))
  locations: string[];

  @IsOptional()
  @IsIn(levelsOfExperience)
  public levelOfExperience: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => value.toString().split(','))
  public typesOfTraining: string[];
}
