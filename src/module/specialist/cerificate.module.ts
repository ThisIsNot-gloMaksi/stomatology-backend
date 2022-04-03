import {Module} from '@nestjs/common';
import {Certificate} from '../../entity/specialist/certificate.entity';
import {CertificateController} from '../../controller/specialist/certificate.controller';
import {CertificateService} from '../../service/specialist/certificate.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SpecialistModule} from "./specialist.module";

@Module({
  imports: [TypeOrmModule.forFeature([Certificate]), SpecialistModule],
  providers: [CertificateService],
  controllers: [CertificateController],
})
export class CerificateModule {
}
