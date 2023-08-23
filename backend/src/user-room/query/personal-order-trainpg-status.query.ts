import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsString } from 'class-validator';

export class PersonalOrderTrainingStatusQuery {
  @Transform(({ value }) => +value)
  @IsNumber()
  public orderId: number;

  @IsString()
  @IsIn(['отклонён', 'принят'])
  public newStatus: string;
}
