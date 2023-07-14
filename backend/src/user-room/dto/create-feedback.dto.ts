import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { FeedbackTextLength, Rating } from 'src/common/constant';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Id of traning',
    example: '4',
  })
  @IsNumber()
  trainingId: number;

  @ApiProperty({
    description: 'Rating of traning',
    example: '4',
  })
  @IsNumber()
  @Min(Rating.Min)
  @Max(Rating.Max)
  rating: number;

  @ApiProperty({
    description: 'Feedback  text',
    example: 'Было здорово',
  })
  @IsString()
  @MinLength(FeedbackTextLength.Min)
  @MaxLength(FeedbackTextLength.Max)
  text: string;
}
