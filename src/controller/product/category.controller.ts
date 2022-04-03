import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {CreateCategoryDto, UpdateCategoryDto} from "../../dto/product/category.dto";
import {CategoryService} from "../../service/product/category.service";
import {ApiBody, ApiCreatedResponse, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import {Category} from "../../entity/product/category.entity";

@Controller("api/v1/categories")
@ApiTags("categories")
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {
    }

    @ApiQuery({name: "productId", description: "id услуги"})
    @ApiCreatedResponse({type: Category, isArray: true, description: "категории относящиесся к услуге"})
    @Get()
    getCategoriesByProductId(@Query("productId") productId: number): Promise<Category[]> {
        return this.categoryService.getCategoriesByProductId(productId);
    }

    @ApiParam({name: "id", description: "id категории"})
    @ApiCreatedResponse({type: Category, description: "категория"})
    @Get(":id")
    getCategoryById(@Param("id") id: number) {
        return this.categoryService.getCategoryById(id);
    }

    @ApiBody({
        description: 'категория',
        type: CreateCategoryDto,
    })
    @ApiCreatedResponse({type: Category, description: "категория"})
    @Post()
    createCategory(@Body() createDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createDto);
    }

    @ApiParam({name: "id", description: "id категории"})
    @ApiBody({description: "категория"})
    @ApiCreatedResponse({type: Category, description: "категория"})
    @Put(":id")
    updateCategory(@Param("id") id: number, @Body() updateDto: UpdateCategoryDto) {
        return this.categoryService.updateCategory(id, updateDto);
    }

    @ApiParam({name: "id", description: "id категории"})
    @Delete(":id")
    deleteCategoryById(@Param("id") id: number) {
        this.categoryService.deleteCategoryById(id);
    }


}
