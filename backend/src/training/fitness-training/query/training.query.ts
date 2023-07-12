import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CaloriesQttDaily } from 'src/common/constant.user';

export class TrainingQuery {
  @IsOptional()
  @Transform(({ value }) => value.toString().split(','))
  @IsArray()
  @IsString({ each: true })
  durations: string[];

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  @Min(0)
  public priceMin: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  @Min(0)
  public priceMax: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  @Min(CaloriesQttDaily.Min)
  public caloriesQttMin: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  @Max(CaloriesQttDaily.Max)
  public caloriesQttMax: number;
}
