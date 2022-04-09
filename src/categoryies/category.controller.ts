import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto, UpdateCategoryDto} from "./category.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("api/v1/categories")
@Controller('api/v1/categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Get()
    getCategories() {
        return this.categoryService.getCategories();
    }

    @Get(":id")
    getCategoryById(id: number) {
        return this.categoryService.getCategoryById(id);
    }

    @Post()
    addCategory(@Body() dto: CreateCategoryDto) {
        return this.categoryService.addCategory(dto);
    }

    @Patch(":id")
    updateCategoryById(@Param() id: number, @Body() dto: UpdateCategoryDto) {
        return this.categoryService.updateCategoryById(id, dto);
    }

    @Delete()
    deleteCategoryById(@Param() id: number) {
        return this.categoryService.deleteCategoryById(id);
    }


}
