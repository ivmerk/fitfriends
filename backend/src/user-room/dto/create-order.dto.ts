import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString, Min } from 'class-validator';
import { typesOfOrder, typesOfPayment } from 'src/common/constant';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Type of order',
    example: 'абонемент',
  })
  @IsString()
  @IsIn(typesOfOrder)
  typeOfOrder: string;

  @ApiProperty({
    description: 'Id of traning',
    example: '4',
  })
  @IsNumber()
  trainingId: number;

  @ApiProperty({
    description: 'Price of traning',
    example: '4',
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Qtt of tranings',
    example: '10',
  })
  @IsNumber()
  qtt: number;

  @ApiProperty({
    description: 'Type of the payment',
    example: 'visa',
  })
  @IsString()
  @IsIn(typesOfPayment)
  typeOfPayment: string;
}
