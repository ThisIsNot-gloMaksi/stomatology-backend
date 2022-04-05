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

    getSimpleProduct() {
        const result = this.productRepository.find();
        this.controllerExceptions.notUndefinedPromise(result, 'products');
        return result.then((productList) => {
            return productList.map((it) => {
                return {
                    id: it.id,
                    name: it.name,
                    article: it.articleNumber,
                };
            });
        });
    }

    getProductById(id: number): Promise<Product> {
        return this.controllerExceptions.notUndefinedPromise(
            this.productRepository
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.property', 'p')
                .where('product.id=:id', {id: id})
                .getOne(),
            'product'
        );
    }


    createProduct(product: CreateProductDto): Promise<Product> {
        return this.productRepository.save(product);
    }

    updateProductById(id: number, product: UpdateProductDto): Promise<UpdateResult> {
        return this.productRepository.update(id, product);
    }

    deleteProductById(id: number): Promise<DeleteResult> {
        return this.productRepository.delete(id);
    }
}
