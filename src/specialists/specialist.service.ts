import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Specialist} from './specialist.entity';
import {Repository} from 'typeorm';
import {CreateSpecialistDto, UpdateSpecialistDto} from './specialist.dto';
import {ControllerExceptions} from "../valid/controller.valid";

@Injectable()
export class SpecialistService {
    constructor(
        @InjectRepository(Specialist)
        private readonly specialistRepository: Repository<Specialist>,
        private readonly controllerExceptions: ControllerExceptions
    ) {
    }

    getSimpleVersionSpecialists() {
        const result = this.specialistRepository.find();
        this.controllerExceptions.notUndefinedPromise(result, 'specialists')
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
        return this.controllerExceptions.notUndefinedPromise(
            this.specialistRepository
                .createQueryBuilder('specialist')
                .leftJoinAndSelect('specialist.certificates', 's')
                .where('specialist.id=:id', {id: id})
                .getOne(),
            'specialist'
        );
    }

    createSpecialist(dto: CreateSpecialistDto) {
        return this.specialistRepository.save(dto);
    }

    updateSpecialistById(id: number, updateDto: UpdateSpecialistDto) {
        return this.specialistRepository.update(id, updateDto);
    }

    deleteSpecialistById(id: number) {
        return this.specialistRepository.delete(id);
    }
}
