import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty()
  @IsIn([1, 2, 3, 4, 5])
  estimation: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}
