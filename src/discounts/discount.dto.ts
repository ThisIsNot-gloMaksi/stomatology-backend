import {IsDate, IsNotEmpty, IsString, IsUrl} from 'class-validator';
import {PartialType} from '@nestjs/swagger';

export class CreateDiscountDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDate()
    @IsNotEmpty()
    startDiscount: Date;

    @IsDate()
    @IsNotEmpty()
    endDiscount: Date;

    @IsUrl()
    @IsNotEmpty()
    imageUrl: string;
}

export class UpdateDiscountDto extends PartialType(CreateDiscountDto) {
}
