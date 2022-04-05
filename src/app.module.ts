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
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./users/user.module";
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/user.entity";

@Module({
    imports: [
        FeedbackModule,
        DiscountModule,
        ProductModule,
        SpecialistModule,
        CertificateModule,
        PropertyModule,
        AuthModule,
        UserModule,
        ConfigModule.forRoot(),
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
                Property,
                Specialist,
                Certificate,
                User
            ],
            synchronize: true,
        }),
    ],
})
export class AppModule {
}
