import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {CreateProductDto, UpdateProductDto} from './product.dto';
import {ControllerExceptions} from "../valid/controller.valid";
import {Category} from "../categoryies/category.entity";
import {CategoryService} from "../categoryies/category.service";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly controllerExceptions: ControllerExceptions,
        private readonly categoryService: CategoryService
    ) {
    }

    async getSimpleProduct() {
        const result = this.productRepository.find();
        const productList: Product[] = await this.controllerExceptions
            .notUndefinedItem(result, 'products');
        return productList.map((it) => {
            return {
                id: it.id,
                name: it.name,
                article: it.articleNumber,
            };
        });
    }

    async getProductById(id: number): Promise<Product> {
        return this.controllerExceptions.notUndefinedItem(
            await this.productRepository
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.property', 'p')
                .leftJoinAndSelect('product.category', 'c')
                .where('product.id=:id', {id: id})
                .getOne(),
            'product'
        );
    }


    async createProduct(product: CreateProductDto): Promise<Product> {
        return await this.productRepository.save(product);
    }

    async updateProductById(id: number, product: UpdateProductDto): Promise<UpdateResult> {
        return await this.productRepository.update(id, product);
    }

    async deleteProductById(id: number): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }

    async joinToCategory(categoryId: number, productId: number): Promise<Product> {
        const category: Category = await this.categoryService.getCategoryById(categoryId);
        const product: Product = await this.getProductById(productId);

        product.category.push(category);
        return await this.productRepository.save(product);
    }
}
