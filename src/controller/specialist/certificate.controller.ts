import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {CreateCertificateDto, UpdateCertificateDto} from "../../dto/specialist/certificate.dto";
import {CertificateService} from "../../service/specialist/certificate.service";
import {ApiBody, ApiCreatedResponse, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import {Certificate} from "../../entity/specialist/certificate.entity";

@ApiTags("certificates")
@Controller("api/v1/certificates")
export class CertificateController {
    constructor(private readonly certificateService: CertificateService) {
    }

    @ApiQuery({name: "specialistId", description: "Все сертификаты"})
    @ApiCreatedResponse({type: Certificate, isArray: true, description: "сертификат"})
    @Get()
    getCertificates(@Query("specialistId") specialistId: number) {
        return this.certificateService.getCertificates(specialistId);
    }

    @ApiQuery({name: "specialistId", description: "Все сертификаты"})
    @ApiBody({type: CreateCertificateDto, description: "Сертификат"})
    @ApiCreatedResponse({type: Certificate, description: "Сертификат"})
    @Post()
    createCertificate(@Query("specialistId") specialistId: number, @Body() createDto: CreateCertificateDto) {
        return this.certificateService.createCertificate(specialistId, createDto);
    }

    @ApiParam({name: "id", description: "id сертификата"})
    @ApiBody({type: UpdateCertificateDto, description: "Сертификат"})
    @ApiCreatedResponse({type: Certificate, description: "Сертификат"})
    @Put(":id")
    updateCertificate(@Param("id") id: number,
                      @Body() updateDto: UpdateCertificateDto) {
        return this.certificateService.updateCertificate(id, updateDto);
    }

    @ApiParam({name: "id", description: "id сертификата"})
    @Delete(":id")
    deleteCertificate(@Param("id") id: number) {
        this.certificateService.deleteCertificate(id);
    }
}
