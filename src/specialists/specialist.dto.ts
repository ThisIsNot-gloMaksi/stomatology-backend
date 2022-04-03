import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BaseSpecialistDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  specialization: string[];
}

export class CreateSpecialistDto extends BaseSpecialistDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class SimpleSpecialistDto extends BaseSpecialistDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class UpdateSpecialistDto extends PartialType(CreateSpecialistDto) {}
