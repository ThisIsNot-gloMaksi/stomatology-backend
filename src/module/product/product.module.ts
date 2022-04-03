import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Product} from '../../entity/product/product.entity';
import {ProductController} from '../../controller/product/product.controller';
import {ProductService} from '../../service/product/product.service';
import {Category} from '../../entity/product/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule {
}
