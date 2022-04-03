import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Discount} from './entity/discount.entity';
import {FeedbackModule} from './module/feedback.module';
import {Feedback} from './entity/feedback.entity';
import {DiscountModule} from './module/discount.module';
import {ProductModule} from './module/product/product.module';
import {Product} from './entity/product/product.entity';
import {Category} from './entity/product/category.entity';
import {Property} from './entity/product/property.entity';
import {SpecialistModule} from './module/specialist/specialist.module';
import {Specialist} from './entity/specialist/specialist.entity';
import {Certificate} from './entity/specialist/certificate.entity';
import {CerificateModule} from "./module/specialist/cerificate.module";
import {CategoryModule} from "./module/product/category.module";
import {PropertyModule} from "./module/product/property.module";

@Module({
    imports: [
        FeedbackModule,
        DiscountModule,
        ProductModule,
        SpecialistModule, CerificateModule, CategoryModule, PropertyModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'test',
            password: 'test',
            database: 'stomatology',
            entities: [
                Discount,
                Feedback,
                Product,
                Category,
                Property,
                Category,
                Specialist,
                Certificate,
            ],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
