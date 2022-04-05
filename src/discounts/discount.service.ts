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

    createDiscount(dto: CreateDiscountDto): Promise<Discount> {
        return this.discountRepository.save(dto);
    }

    deleteDiscountById(id: number): Promise<DeleteResult> {
        return this.discountRepository.delete(id);
    }

    getDiscountById(id: number): Promise<Discount> {
        return this.controllerExceptions.notUndefinedPromise(this.discountRepository.findOne(id), 'discount');
    }

    getDiscounts(): Promise<Discount[]> {
        return this.controllerExceptions.notUndefinedPromise(this.discountRepository.find(), 'discounts');
    }

    update(id: number, dto: UpdateDiscountDto): Promise<UpdateResult> {
        return this.discountRepository.update(id, dto);
    }
}
