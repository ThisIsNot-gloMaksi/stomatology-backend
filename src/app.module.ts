import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Discount} from './discounts/discount.entity';
import {FeedbackModule} from './feedbacks/feedback.module';
import {Feedback} from './feedbacks/feedback.entity';
import {DiscountModule} from './discounts/discount.module';
import {ProductModule} from './products/product.module';
import {Product} from './products/product.entity';
import {Property} from './properties/property.entity';
import {SpecialistModule} from './specialists/specialist.module';
import {Specialist} from './specialists/specialist.entity';
import {Certificate} from './certificates/certificate.entity';
import {CertificateModule} from './certificates/certificate.module';
import {PropertyModule} from './properties/property.module';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './users/user.module';
import {ConfigModule} from '@nestjs/config';
import {User} from './users/user.entity';
import {FileModule} from './files/file.module';
import {CategoryModule} from './categories/category.module';
import {Category} from './categories/category.entity';
import {DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME, PORT} from './config'

@Module({
    imports: [
        FeedbackModule,
        DiscountModule,
        ProductModule,
        CategoryModule,
        SpecialistModule,
        CertificateModule,
        PropertyModule,
        AuthModule,
        UserModule,
        FileModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: DATABASE_HOST,
            port: PORT,
            username: DATABASE_USERNAME,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME,
            entities: [
                Discount,
                Feedback,
                Product,
                Property,
                Specialist,
                Certificate,
                User,
                Product,
                Category
            ],
            synchronize: true,
        }),
    ],
})
export class AppModule {
}
