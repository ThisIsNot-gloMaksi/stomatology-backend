import {Body, Controller, Delete, Get, Param, Post, Put,} from '@nestjs/common';
import {DiscountService} from '../service/discount.service';
import {CreateDiscountDto, UpdateDiscountDto} from '../dto/discount.dto';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiTags} from '@nestjs/swagger';
import {Discount} from "../entity/discount.entity";

@Controller('api/v1/discounts')
@ApiTags('discounts')
export class DiscountController {
    constructor(private readonly discountService: DiscountService) {
    }

    @ApiCreatedResponse({type: Discount, isArray: true, description: "акции"})
    @Get()
    getDiscounts() {
        return this.discountService.getDiscounts();
    }

    @ApiParam({name: "id", description: "id акции"})
    @ApiCreatedResponse({type: Discount, description: "акции"})
    @Get(':id')
    getDiscountById(@Param() id: number) {
        return this.discountService.getDiscountById(id);
    }

    @ApiBody({type: CreateDiscountDto, description: "акция"})
    @ApiCreatedResponse({type: Discount, isArray: true, description: "акции"})
    @Post()
    createDiscount(@Body() dto: CreateDiscountDto) {
        return this.discountService.createDiscount(dto);
    }

    @ApiBody({type: UpdateDiscountDto, description: "акция"})
    @ApiCreatedResponse({type: Discount, isArray: true, description: "акции"})
    @Put(':id')
    update(@Param() id: number, @Body() dto: UpdateDiscountDto) {
        return this.discountService.update(id, dto);
    }

    @ApiParam({name: "id", description: "id акции"})
    @Delete(':id')
    deleteDiscountById(id: number) {
        this.discountService.deleteDiscountById(id);
    }
}
