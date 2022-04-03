import { Module } from '@nestjs/common';
import { Certificate } from './certificate.entity';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialistModule } from '../specialists/specialist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Certificate]), SpecialistModule],
  providers: [CertificateService],
  controllers: [CertificateController],
})
export class CerificateModule {}
