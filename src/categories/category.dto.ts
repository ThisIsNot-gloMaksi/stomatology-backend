import {ApiProperty, PartialType} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    description: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
}
