import { IsIn, IsString } from 'class-validator';
import { sortingType } from 'src/common/constant';

export class TrainingListQuery {
  @IsString()
  @IsIn(sortingType)
  public trainingQttSortingType: string;

  @IsString()
  @IsIn(sortingType)
  public totalMoneySortingType: string;
}
