import {Injectable} from '@nestjs/common';
import {CreateCertificateDto, UpdateCertificateDto} from './certificate.dto';
import {SpecialistService} from '../specialists/specialist.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Certificate} from './certificate.entity';
import {Repository} from 'typeorm';

@Injectable()
export class CertificateService {
    constructor(
        private readonly specialistService: SpecialistService,
        @InjectRepository(Certificate)
        private readonly certificateRepository: Repository<Certificate>,
    ) {
    }

    getCertificate(certificateId: number) {
        return this.certificateRepository.findOne(certificateId);
    }

    getCertificates(specialistId: number): Promise<Certificate[]> {
        return this.specialistService
            .getSpecialistById(specialistId)
            .then((it) => it.certificates);
    }

    createCertificate(specialistId: number, createDto: CreateCertificateDto) {
        const specialist = this.specialistService.getSpecialistById(specialistId);
        const certificate = this.certificateRepository.create(createDto);
        return specialist.then((it) => {
            certificate.specialist = it;
            return this.certificateRepository.save(certificate);
        });
    }

    updateCertificate(certificateId: number, updateDto: UpdateCertificateDto) {
        return this.certificateRepository.update(certificateId, updateDto);
    }

    deleteCertificate(certificateId: number) {
        this.certificateRepository.delete(certificateId);
    }
}
