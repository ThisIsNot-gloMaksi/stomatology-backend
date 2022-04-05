import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put,} from '@nestjs/common';
import {DiscountService} from './discount.service';
import {CreateDiscountDto, UpdateDiscountDto} from './discount.dto';
import {ApiBody, ApiCreatedResponse, ApiParam, ApiTags,} from '@nestjs/swagger';
import {Discount} from './discount.entity';
import {DeleteDto, UpdateDto} from "../utils/result.dto";

@Controller('api/v1/discounts')
@ApiTags('discounts')
export class DiscountController {
    constructor(private readonly discountService: DiscountService) {
    }

    @ApiCreatedResponse({type: Discount, isArray: true, description: 'акции'})
    @Get()
    getDiscounts() {
        return this.discountService.getDiscounts();
    }

    @ApiParam({name: 'id', description: 'id акции'})
    @ApiCreatedResponse({type: Discount, description: 'акции'})
    @Get(':id')
    getDiscountById(@Param('id', ParseIntPipe) id: number) {
        return this.discountService.getDiscountById(id);
    }

    @ApiBody({type: CreateDiscountDto, description: 'акция'})
    @ApiCreatedResponse({type: Discount, isArray: true, description: 'акции'})
    @Post()
    createDiscount(@Body() dto: CreateDiscountDto) {
        return this.discountService.createDiscount(dto);
    }

    @ApiBody({type: UpdateDiscountDto, description: 'акция'})
    @ApiCreatedResponse({type: UpdateDto, isArray: true, description: 'результат обновления'})
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDiscountDto) {
        return this.discountService.update(id, dto);
    }

    @ApiParam({name: 'id', description: 'id акции'})
    @ApiCreatedResponse({type: DeleteDto, isArray: true, description: 'результат удаления'})
    @Delete(':id')
    deleteDiscountById(@Param('id', ParseIntPipe) id: number) {
        return this.discountService.deleteDiscountById(id);
    }
}
