import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './discount.entity';
import { Repository } from 'typeorm';
import { CreateDiscountDto, UpdateDiscountDto } from './discount.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  createDiscount(dto: CreateDiscountDto) {
    return this.discountRepository.save(dto);
  }

  deleteDiscountById(id: number) {
    this.discountRepository.delete(id);
  }

  getDiscountById(id: number) {
    return this.discountRepository.findOne(id);
  }

  getDiscounts() {
    return this.discountRepository.find();
  }

  update(id: number, dto: UpdateDiscountDto) {
    return this.discountRepository.update(id, dto);
  }
}
