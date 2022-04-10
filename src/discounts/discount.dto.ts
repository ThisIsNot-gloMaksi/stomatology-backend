import {IsDate, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty, PartialType} from '@nestjs/swagger';
import {Type} from "class-transformer";

export class CreateDiscountDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    startDiscount: Date;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    endDiscount: Date;

    @ApiProperty()
    imageName: string;
}

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
}
