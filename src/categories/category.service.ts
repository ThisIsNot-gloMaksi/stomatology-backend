import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {Repository} from "typeorm";
import {CreateCategoryDto, UpdateCategoryDto} from "./category.dto";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {
    }

    async getCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async getCategoryById(id: number): Promise<Category> {
        return await this.categoryRepository.findOne(id);
    }

    async addCategory(dto: CreateCategoryDto): Promise<Category> {
        return await this.categoryRepository.save(dto);
    }

    async updateCategoryById(id: number, dto: UpdateCategoryDto) {
        return await this.categoryRepository.update(id, dto)
    }

    async deleteCategoryById(id: number) {
        return await this.categoryRepository.delete(id);
    }


}
