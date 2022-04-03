import {Body, Controller, Delete, Get, Param, Post, Put,} from '@nestjs/common';
import {CreateProductDto, SimpleProductDto, UpdateProductDto} from '../../dto/product/product.dto';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiTags} from '@nestjs/swagger';
import {Product} from '../../entity/product/product.entity';
import {ProductService} from '../../service/product/product.service';

@Controller('api/v1/products')
@ApiTags('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @ApiCreatedResponse({type: SimpleProductDto, isArray: true, description: "Все услуги"})
    @Get()
    getSimpleProducts() {
        return this.productService.getSimpleProduct();
    }

    @ApiParam({name: "id", description: "id услуги"})
    @ApiCreatedResponse({type: Product, description: "услуга"})
    @Get(':id')
    getProductById(@Param('id') id: number) {
        return this.productService.getProductById(id);
    }

    @ApiBody({type: CreateProductDto, description: "услуга"})
    @ApiCreatedResponse({type: Product, description: "услуга"})
    @Post()
    createProduct(@Body() product: CreateProductDto) {
        return this.productService.createProduct(product);
    }


    @ApiParam({name: "id", description: "id услуги"})
    @ApiBody({type: CreateProductDto, description: "услуга"})
    @ApiCreatedResponse({type: Product, description: "услуга"})
    @Put(':id')
    updateProductById(
        @Param('id') id: number,
        @Body() product: UpdateProductDto,
    ) {
        return this.productService.updateProductById(id, product);
    }

    @Delete(':id')
    deleteProductById(@Param('id') id: number) {
        return this.productService.deleteProductById(id);
    }
}
