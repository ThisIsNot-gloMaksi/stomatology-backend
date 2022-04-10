import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards,} from '@nestjs/common';
import {CreateProductDto, SimpleProductDto, UpdateProductDto,} from './product.dto';
import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiParam, ApiQuery, ApiTags,} from '@nestjs/swagger';
import {Product} from './product.entity';
import {ProductService} from './product.service';
import {DeleteDto, UpdateDto} from "../dto/result.dto";
import {JwtAuthGuard} from "../auth/guard/jwt.guard";


@Controller('api/v1/products')
@ApiTags('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @ApiCreatedResponse({
        type: SimpleProductDto,
        isArray: true,
        description: 'Все услуги',
    })
    @Get()
    getSimpleProducts() {
        return this.productService.getSimpleProduct();
    }

    @ApiParam({name: 'id', description: 'id услуги'})
    @ApiCreatedResponse({type: Product, description: 'услуга'})
    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProductById(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({type: CreateProductDto, description: 'услуга'})
    @ApiCreatedResponse({type: Product, description: 'услуга'})
    @Post()
    createProduct(@Body() product: CreateProductDto) {
        return this.productService.createProduct(product);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({name: 'productId', description: 'id услуги'})
    @ApiQuery({name: 'categoryId', description: 'id категории к которой нужно присоединить данный сервис'})
    @Post(":productId")
    joinToCategory(@Param('productId') productId: number,
                   @Query('categoryId') categoryId: number) {
        return this.productService.joinToCategory(categoryId, productId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({name: 'id', description: 'id услуги'})
    @ApiBody({type: CreateProductDto, description: 'услуга'})
    @ApiCreatedResponse({type: UpdateDto, description: 'результат обновления'})
    @Patch(':id')
    updateProductById(
        @Param('id', ParseIntPipe) id: number,
        @Body() product: UpdateProductDto,
    ) {
        return this.productService.updateProductById(id, product);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({type: DeleteDto, description: 'результат удаления'})
    @Delete(':id')
    deleteProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.deleteProductById(id);
    }
}
