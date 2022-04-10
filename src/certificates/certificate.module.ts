import {Module} from '@nestjs/common';
import {Certificate} from './certificate.entity';
import {CertificateController} from './certificate.controller';
import {CertificateService} from './certificate.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SpecialistModule} from '../specialists/specialist.module';
import {ControllerExceptions} from '../valid/controller.valid';

@Module({
    imports: [TypeOrmModule.forFeature([Certificate]), SpecialistModule],
    providers: [CertificateService, ControllerExceptions],
    controllers: [CertificateController],
})
export class CertificateModule {
}
