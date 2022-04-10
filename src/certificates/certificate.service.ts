import {Injectable} from '@nestjs/common';
import {CreateCertificateDto, UpdateCertificateDto} from './certificate.dto';
import {SpecialistService} from '../specialists/specialist.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Certificate} from './certificate.entity';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {ControllerExceptions} from '../valid/controller.valid';
import {Specialist} from '../specialists/specialist.entity';

@Injectable()
export class CertificateService {
    constructor(
        private readonly specialistService: SpecialistService,
        @InjectRepository(Certificate)
        private readonly certificateRepository: Repository<Certificate>,
        private readonly controllerExceptions: ControllerExceptions
    ) {
    }

    async getCertificate(certificateId: number): Promise<Certificate> {
        return this.controllerExceptions
            .notUndefinedItem(await this.certificateRepository.findOne(certificateId), 'certificate');
    }

    async getCertificates(specialistId: number): Promise<Certificate[]> {
        return this.controllerExceptions.notUndefinedItem(
            await this.specialistService
                .getSpecialistById(specialistId)
                .then((it) => it.certificates), 'certificates');
    }

    async createCertificate(specialistId: number, createDto: CreateCertificateDto): Promise<Certificate> {
        const specialist: Specialist = await this.specialistService.getSpecialistById(specialistId);
        const certificate: Certificate = await this.certificateRepository.create(createDto);
        certificate.specialist = specialist;
        return this.certificateRepository.save(certificate);

    }

    async updateCertificate(certificateId: number, updateDto: UpdateCertificateDto): Promise<UpdateResult> {
        return await this.certificateRepository.update(certificateId, updateDto);
    }

    async deleteCertificate(certificateId: number): Promise<DeleteResult> {
        return await this.certificateRepository.delete(certificateId);
    }
}
