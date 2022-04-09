import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards,} from '@nestjs/common';
import {CreateCertificateDto, UpdateCertificateDto} from './certificate.dto';
import {CertificateService} from './certificate.service';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiQuery, ApiTags,} from '@nestjs/swagger';
import {Certificate} from './certificate.entity';
import {JwtAuthGuard} from "../auth/guard/jwt.guard";
import {DeleteDto, UpdateDto} from "../dto/result.dto";

@ApiTags('certificates')
@Controller('api/v1/certificates')
export class CertificateController {
    constructor(private readonly certificateService: CertificateService) {
    }

    @ApiQuery({name: 'specialistId', description: 'Все сертификаты'})
    @ApiCreatedResponse({
        type: Certificate,
        isArray: true,
        description: 'сертификат',
    })

    @Get()
    getCertificates(@Query('specialistId', ParseIntPipe) specialistId: number) {
        return this.certificateService.getCertificates(specialistId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiQuery({name: 'specialistId', description: 'Все сертификаты'})
    @ApiBody({type: CreateCertificateDto, description: 'Сертификат'})
    @ApiCreatedResponse({type: Certificate, description: 'Сертификат'})
    @Post()
    createCertificate(
        @Query('specialistId', ParseIntPipe) specialistId: number,
        @Body() createDto: CreateCertificateDto,
    ) {
        return this.certificateService.createCertificate(specialistId, createDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({name: 'id', description: 'id сертификата'})
    @ApiBody({type: UpdateCertificateDto, description: 'Сертификат'})
    @ApiCreatedResponse({type: UpdateDto, description: 'результат обновления'})
    @Patch(':id')
    updateCertificate(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateCertificateDto,
    ) {
        return this.certificateService.updateCertificate(id, updateDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({name: 'id', description: 'id сертификата'})
    @ApiCreatedResponse({type: DeleteDto, description: 'результат удаления'})
    @Delete(':id')
    deleteCertificate(@Param('id', ParseIntPipe) id: number) {
        return this.certificateService.deleteCertificate(id);
    }
}
