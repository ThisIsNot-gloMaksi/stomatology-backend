import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Specialist} from '../../entity/specialist/specialist.entity';
import {Repository} from 'typeorm';
import {CreateSpecialistDto, UpdateSpecialistDto,} from '../../dto/specialist/specialist.dto';

@Injectable()
export class SpecialistService {
    constructor(
        @InjectRepository(Specialist)
        private readonly specialistRepository: Repository<Specialist>,
    ) {
    }

    getSimpleVersionSpecialists() {
        const result = this.specialistRepository.find();
        return result.then((productList) => {
            return productList.map((it) => {
                return {
                    id: it.id,
                    name: it.name,
                    specialization: it.specialization,
                };
            });
        });
    }

    getSpecialistById(id: number): Promise<Specialist> {
        return this.specialistRepository.createQueryBuilder('specialist')
            .innerJoinAndSelect("specialist.certificates", 's')
            .where("specialist.id=:id", {id: id})
            .getOne();
    }

    createSpecialist(@Body() dto: CreateSpecialistDto) {
        return this.specialistRepository.save(dto);
    }

    updateSpecialistById(id: number, updateDto: UpdateSpecialistDto) {
        return this.specialistRepository.update(id, updateDto);
    }

    deleteSpecialistById(id: number) {
        return this.specialistRepository.delete(id);
    }
}
