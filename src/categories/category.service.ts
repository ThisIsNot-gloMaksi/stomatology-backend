import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { ProductService } from '../products/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    private readonly productService: ProductService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  getCategoriesByProductId(productId: number) {
    return this.productService
      .getProductById(productId)
      .then((it) => it.category);
  }

  getCategoryById(id: number) {
    return this.categoryRepository.findOne(id);
  }

  createCategory(createDto: CreateCategoryDto) {
    return this.categoryRepository.save(createDto);
  }

  updateCategory(id: number, updateDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateDto);
  }

  deleteCategoryById(id: number) {
    this.categoryRepository.delete(id);
  }
}
