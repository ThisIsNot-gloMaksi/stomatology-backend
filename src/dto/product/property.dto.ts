import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {ApiProperty, PartialType} from "@nestjs/swagger";

export class CreatePropertyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
}
