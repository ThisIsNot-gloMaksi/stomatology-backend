import {Injectable} from '@nestjs/common';
import {CreateCertificateDto, UpdateCertificateDto} from './certificate.dto';
import {SpecialistService} from '../specialists/specialist.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Certificate} from './certificate.entity';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {ControllerExceptions} from "../valid/controller.valid";

@Injectable()
export class CertificateService {
    constructor(
        private readonly specialistService: SpecialistService,
        @InjectRepository(Certificate)
        private readonly certificateRepository: Repository<Certificate>,
        private readonly controllerExceptions: ControllerExceptions
    ) {
    }

    getCertificate(certificateId: number): Promise<Certificate> {
        return this.controllerExceptions
            .notUndefinedPromise(this.certificateRepository.findOne(certificateId), 'certificate');
    }

    getCertificates(specialistId: number): Promise<Certificate[]> {
        return this.controllerExceptions.notUndefinedPromise(
            this.specialistService
                .getSpecialistById(specialistId)
                .then((it) => it.certificates), 'certificates');
    }

    createCertificate(specialistId: number, createDto: CreateCertificateDto): Promise<Certificate> {
        const specialist = this.specialistService.getSpecialistById(specialistId);
        const certificate = this.certificateRepository.create(createDto);
        return specialist.then((it) => {
            certificate.specialist = it;
            return this.certificateRepository.save(certificate);
        });
    }

    updateCertificate(certificateId: number, updateDto: UpdateCertificateDto): Promise<UpdateResult> {
        return this.certificateRepository.update(certificateId, updateDto);
    }

    deleteCertificate(certificateId: number): Promise<DeleteResult> {
        return this.certificateRepository.delete(certificateId);
    }
}
