import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Specialist} from '../../entity/specialist/specialist.entity';
import {SpecialistService} from '../../service/specialist/specialist.service';
import {SpecialistController} from '../../controller/specialist/specialist.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Specialist])],
    providers: [SpecialistService],
    controllers: [SpecialistController],
    exports: [SpecialistService]
})
export class SpecialistModule {
}
