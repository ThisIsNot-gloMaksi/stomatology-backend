import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialist } from './specialist.entity';
import { SpecialistService } from './specialist.service';
import { SpecialistController } from './specialist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Specialist])],
  providers: [SpecialistService],
  controllers: [SpecialistController],
  exports: [SpecialistService],
})
export class SpecialistModule {}
