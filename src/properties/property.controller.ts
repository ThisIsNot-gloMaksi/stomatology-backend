import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query,} from '@nestjs/common';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiQuery, ApiTags,} from '@nestjs/swagger';
import {CreatePropertyDto, UpdatePropertyDto} from './property.dto';
import {PropertyService} from './property.service';
import {Property} from './property.entity';
import {UpdateDto} from "../utils/result.dto";

@Controller('api/v1/properties')
@ApiTags('properties')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) {
    }

    @ApiQuery({name: 'productId', description: 'id продукта'})
    @ApiCreatedResponse({
        type: Property,
        isArray: true,
        description: 'свойства',
    })
    @Get()
    getPropertiesByIdProduct(@Query('idProduct', ParseIntPipe) productId: number) {
        return this.propertyService.getPropertiesByProductId(productId);
    }

    @ApiParam({name: 'id', description: 'id свойства'})
    @ApiCreatedResponse({type: Property, description: 'свойство'})
    @Get(':id')
    getPropertyById(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.getPropertyById(id);
    }

    @ApiQuery({name: 'productId', description: 'id продукта'})
    @ApiBody({type: CreatePropertyDto})
    @ApiCreatedResponse({type: Property, description: 'свойство'})
    @Post()
    createPropertyByProductId(
        @Query('productId') productId: number,
        @Body() createDto: CreatePropertyDto,
    ) {
        return this.propertyService.createPropertyByProductId(productId, createDto);
    }

    @ApiParam({name: 'id', description: 'id свойства'})
    @ApiBody({type: CreatePropertyDto, description: 'свойство'})
    @ApiCreatedResponse({type: UpdateDto, description: 'результат обновления'})
    @Put(':id')
    updateProperty(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdatePropertyDto,
    ) {
        return this.propertyService.updateProperty(id, updateDto);
    }

    @ApiParam({name: 'id', description: 'id свойства'})
    @ApiCreatedResponse({type: UpdateDto, description: 'результат удаления'})
    @Delete(':id')
    deleteProperty(@Param('id', ParseIntPipe) id: number) {
        this.propertyService.deleteProperty(id);
    }
}
