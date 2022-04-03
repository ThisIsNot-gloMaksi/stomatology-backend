import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './discounts/discount.entity';
import { FeedbackModule } from './feedbacks/feedback.module';
import { Feedback } from './feedbacks/feedback.entity';
import { DiscountModule } from './discounts/discount.module';
import { ProductModule } from './products/product.module';
import { Product } from './products/product.entity';
import { Category } from './categories/category.entity';
import { Property } from './properties/property.entity';
import { SpecialistModule } from './specialists/specialist.module';
import { Specialist } from './specialists/specialist.entity';
import { Certificate } from './certificates/certificate.entity';
import { CerificateModule } from './certificates/cerificate.module';
import { CategoryModule } from './categories/category.module';
import { PropertyModule } from './properties/property.module';

@Module({
  imports: [
    FeedbackModule,
    DiscountModule,
    ProductModule,
    SpecialistModule,
    CerificateModule,
    CategoryModule,
    PropertyModule,
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
