import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { PropertyController } from './property.controller';
import { ProductModule } from '../products/product.module';
import { PropertyService } from './property.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), ProductModule],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
