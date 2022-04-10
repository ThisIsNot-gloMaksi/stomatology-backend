import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Specialist} from './specialist.entity';
import {Repository} from 'typeorm';
import {CreateSpecialistDto, UpdateSpecialistDto} from './specialist.dto';
import {ControllerExceptions} from '../valid/controller.valid';

@Injectable()
export class SpecialistService {
    constructor(
        @InjectRepository(Specialist)
        private readonly specialistRepository: Repository<Specialist>,
        private readonly controllerExceptions: ControllerExceptions
    ) {
    }

    async getSimpleVersionSpecialists() {
        const result = await this.specialistRepository.find();
        this.controllerExceptions.notUndefinedItem(result, 'specialists');

        return result.map((it) => {
            return {
                id: it.id,
                name: it.name,
                specialization: it.specialization,
            };
        });
    }

    async getSpecialistById(id: number): Promise<Specialist> {
        const specialist: Specialist = await this.specialistRepository
            .createQueryBuilder('specialist')
            .leftJoinAndSelect('specialist.certificates', 's')
            .where('specialist.id=:id', {id: id})
            .getOne()

        return this.controllerExceptions
            .notUndefinedItem(specialist, 'specialist');
    }

    async createSpecialist(dto: CreateSpecialistDto) {
        return await this.specialistRepository.save(dto);
    }

    async updateSpecialistById(id: number, updateDto: UpdateSpecialistDto) {
        return this.specialistRepository.update(id, updateDto);
    }

    async deleteSpecialistById(id: number) {
        return this.specialistRepository.delete(id);
    }
}
