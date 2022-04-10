import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto, UpdateCategoryDto} from './category.dto';
import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiParam, ApiTags} from '@nestjs/swagger';
import {Category} from './category.entity';
import {DeleteDto, UpdateDto} from '../dto/result.dto';
import {JwtAuthGuard} from '../auth/guard/jwt.guard';

@ApiTags('categories')
@Controller('api/v1/categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }


    @ApiCreatedResponse(
        {
            type: Category,
            isArray: true,
            description: 'Категории'
        }
    )
    @Get()
    getCategories() {
        return this.categoryService.getCategories();
    }

    @Get(':id')
    @ApiParam({name: 'id', description: 'id категории'})
    @ApiCreatedResponse({type: Category, description: 'категория'})
    getCategoryById(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.getCategoryById(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({type: CreateCategoryDto, description: 'категория'})
    @ApiCreatedResponse({type: Category, description: 'категория'})
    addCategory(@Body() dto: CreateCategoryDto) {
        return this.categoryService.addCategory(dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({name: 'id', description: 'id категории'})
    @ApiBody({type: CreateCategoryDto, description: 'категория'})
    @ApiCreatedResponse({type: UpdateDto, description: 'результат обновления'})
    @Patch(":id")
    updateCategoryById(@Param() id: number, @Body() dto: UpdateCategoryDto) {
        return this.categoryService.updateCategoryById(id, dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({name: 'id', description: 'id категории'})
    @ApiCreatedResponse({type: DeleteDto, description: 'результат удаления'})
    @Delete()
    deleteCategoryById(@Param() id: number) {
        return this.categoryService.deleteCategoryById(id);
    }


}
