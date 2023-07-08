import { Transform } from 'class-transformer';
import { DEFAULT_USER_COUNT_LIMIT } from '../fitness-user.constant';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { UserRoleType, userRoleTypes } from 'src/types/user-role.enum';
import { levelsOfExperience, userLocations } from 'src/common/constant.user';
import { typesOfTraning } from 'src/common/constant.training';

export class UserQuery {
  @Transform(({ value }) => +value || DEFAULT_USER_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_USER_COUNT_LIMIT;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page: number;

  @IsIn(userLocations)
  @IsOptional()
  locations: string[];

  @IsIn(levelsOfExperience)
  @IsOptional()
  public levelOfExperience: string;

  @IsIn(typesOfTraning)
  @IsOptional()
  public typesOfTraining: string[];

  @IsIn(userRoleTypes)
  @IsOptional()
  public userRole: UserRoleType;
}
