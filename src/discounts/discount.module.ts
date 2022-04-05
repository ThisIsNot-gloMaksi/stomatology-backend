import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Discount} from './discount.entity';
import {DiscountController} from './discount.controller';
import {DiscountService} from './discount.service';
import {ControllerExceptions} from "../valid/controller.valid";

@Module({
    imports: [TypeOrmModule.forFeature([Discount])],
    controllers: [DiscountController],
    providers: [DiscountService, ControllerExceptions],
})
export class DiscountModule {
}
