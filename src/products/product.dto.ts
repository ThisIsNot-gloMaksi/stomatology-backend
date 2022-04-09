import {IsNotEmpty, IsNumber} from 'class-validator';
import {ApiProperty, PartialType} from '@nestjs/swagger';

export class BaseProductDto {
    @ApiProperty()
    @IsNotEmpty()
    articleNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;
}

export class SimpleProductDto extends BaseProductDto {
    @ApiProperty()
    @IsNumber()
    id: number;
}

export class CreateProductDto extends BaseProductDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    minPrice: number;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

}

export class UpdateProductDto extends PartialType(CreateProductDto) {
}
