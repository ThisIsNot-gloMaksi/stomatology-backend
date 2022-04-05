import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './product.entity';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {CreateProductDto, UpdateProductDto} from './product.dto';
import {ControllerExceptions} from "../valid/controller.valid";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly controllerExceptions: ControllerExceptions
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
}
