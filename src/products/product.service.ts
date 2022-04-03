import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getSimpleProduct() {
    const result = this.productRepository.find();
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

  getProductById(id: number) {
    return this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.properties', 'p')
      .innerJoinAndSelect('product.category', 'c')
      .where('product.id=:id', { id: id })
      .getOne();
  }

  createProduct(@Body() product: CreateProductDto) {
    return this.productRepository.save(product);
  }

  updateProductById(
    @Param('id') id: number,
    @Body() product: UpdateProductDto,
  ) {
    return this.productRepository.update(id, product);
  }

  deleteProductById(@Param('id') id: number) {
    return this.productRepository.delete(id);
  }
}
