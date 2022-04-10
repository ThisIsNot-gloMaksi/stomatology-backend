import {ApiProperty, PartialType} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateCertificateDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    imageName: string;
}

export class UpdateCertificateDto extends PartialType(CreateCertificateDto) {
}
