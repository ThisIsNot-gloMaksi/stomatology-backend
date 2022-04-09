import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {ControllerExceptions} from "../valid/controller.valid";
import {CategoryModule} from "../categoryies/category.module";

@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
    controllers: [ProductController],
    providers: [ProductService, ControllerExceptions],
    exports: [ProductService]
})
export class ProductModule {
}
