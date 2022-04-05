import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Discount} from './discount.entity';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {CreateDiscountDto, UpdateDiscountDto} from './discount.dto';
import {ControllerExceptions} from "../valid/controller.valid";

@Injectable()
export class DiscountService {
    constructor(
        @InjectRepository(Discount)
        private readonly discountRepository: Repository<Discount>,
        private readonly controllerExceptions: ControllerExceptions
    ) {
    }

    async createDiscount(dto: CreateDiscountDto): Promise<Discount> {
        return await this.discountRepository.save(dto);
    }

    async deleteDiscountById(id: number): Promise<DeleteResult> {
        return await this.discountRepository.delete(id);
    }

    async getDiscountById(id: number): Promise<Discount> {
        return this.controllerExceptions.notUndefinedItem(await this.discountRepository
            .findOne(id), 'discount');
    }

    async getDiscounts(): Promise<Discount[]> {
        return this.controllerExceptions.notUndefinedItem(await this.discountRepository
            .find(), 'discounts');
    }

    async update(id: number, dto: UpdateDiscountDto): Promise<UpdateResult> {
        return await this.discountRepository.update(id, dto);
    }
}
