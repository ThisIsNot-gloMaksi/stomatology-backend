import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiQuery, ApiTags} from '@nestjs/swagger';
import {CreatePropertyDto, UpdatePropertyDto} from "../../dto/product/property.dto";
import {PropertyService} from "../../service/product/property.service";
import {Property} from "../../entity/product/property.entity";

@Controller('api/v1/properties')
@ApiTags('properties')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) {
    }

    @ApiQuery({name: "productId", description: "id продукта"})
    @ApiCreatedResponse({type: Property, isArray: true, description: "свойства"})
    @Get()
    getPropertiesByIdProduct(@Query('idProduct') productId: number) {
        return this.propertyService.getPropertiesByProductId(productId);
    }

    @ApiParam({name: "id", description: "id свойства"})
    @ApiCreatedResponse({type: Property, description: "свойство"})
    @Get(":id")
    getPropertyById(@Param("id") id: number) {
        return this.propertyService.getPropertyById(id);
    }

    @ApiQuery({name: "productId", description: "id продукта"})
    @ApiBody({type: CreatePropertyDto})
    @ApiCreatedResponse({type: Property, description: "свойство"})
    @Post()
    createPropertyByProductId(@Query('productId') productId: number, @Body() createDto: CreatePropertyDto) {
        return this.propertyService.createPropertyByProductId(productId, createDto);
    }

    @ApiParam({name: "id", description: "id свойства"})
    @ApiBody({type: CreatePropertyDto, description: "свойство"})
    @ApiCreatedResponse({type: Property, description: "свойство"})
    @Put(":id")
    updateProperty(@Param('id') id: number, @Body() updateDto: UpdatePropertyDto) {
        return this.propertyService.updateProperty(id, updateDto);
    }

    @ApiParam({name: "id", description: "id свойства"})
    @Delete(":id")
    deleteProperty(@Param('id') id: number) {
        this.propertyService.deleteProperty(id);
    }
}
