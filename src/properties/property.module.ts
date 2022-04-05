import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Property} from './property.entity';
import {PropertyController} from './property.controller';
import {ProductModule} from '../products/product.module';
import {PropertyService} from './property.service';
import {ControllerExceptions} from "../valid/controller.valid";

@Module({
    imports: [TypeOrmModule.forFeature([Property]), ProductModule],
    controllers: [PropertyController],
    providers: [PropertyService, ControllerExceptions],
})
export class PropertyModule {
}
