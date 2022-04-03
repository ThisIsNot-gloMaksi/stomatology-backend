import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Property} from "../../entity/product/property.entity";
import {PropertyController} from "../../controller/product/property.controller";
import {ProductModule} from "./product.module";
import {PropertyService} from "../../service/product/property.service";


@Module({
    imports: [TypeOrmModule.forFeature([Property]), ProductModule],
    controllers: [PropertyController],
    providers: [PropertyService],
})
export class PropertyModule {
}
