import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,} from '@nestjs/common';
import {CreateProductDto, SimpleProductDto, UpdateProductDto,} from './product.dto';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiTags,} from '@nestjs/swagger';
import {Product} from './product.entity';
import {ProductService} from './product.service';
import {DeleteDto, UpdateDto} from "../utils/result.dto";


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

    @ApiBody({type: CreateProductDto, description: 'услуга'})
    @ApiCreatedResponse({type: Product, description: 'услуга'})
    @Post()
    createProduct(@Body() product: CreateProductDto) {
        return this.productService.createProduct(product);
    }


    @ApiParam({name: 'id', description: 'id услуги'})
    @ApiBody({type: CreateProductDto, description: 'услуга'})
    @ApiCreatedResponse({type: UpdateDto, description: 'результат обновления'})
    @Put(':id')
    updateProductById(
        @Param('id', ParseIntPipe) id: number,
        @Body() product: UpdateProductDto,
    ) {
        return this.productService.updateProductById(id, product);
    }

    @ApiCreatedResponse({type: DeleteDto, description: 'результат удаления'})
    @Delete(':id')
    deleteProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.deleteProductById(id);
    }
}
