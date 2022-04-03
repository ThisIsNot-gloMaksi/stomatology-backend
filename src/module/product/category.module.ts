import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductModule} from "./product.module";
import {Category} from "../../entity/product/category.entity";
import {CategoryController} from "../../controller/product/category.controller";
import {CategoryService} from "../../service/product/category.service";


@Module({
    imports: [TypeOrmModule.forFeature([Category]), ProductModule],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {
}
