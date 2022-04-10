import {Injectable} from '@nestjs/common';
import {CreatePropertyDto, UpdatePropertyDto} from './property.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Property} from './property.entity';
import {Repository} from 'typeorm';
import {ProductService} from '../products/product.service';
import {ControllerExceptions} from '../valid/controller.valid';

@Injectable()
export class PropertyService {
    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,
        private readonly productService: ProductService,
        private readonly controllerExceptions: ControllerExceptions
    ) {
    }

    async getPropertiesByProductId(productId: number) {
        return this.controllerExceptions.notUndefinedItem(
            await this.productService
                .getProductById(productId),
            'properties'
        );
    }

    async getPropertyById(id: number): Promise<Property> {
        return this.controllerExceptions
            .notUndefinedItem(
                await this.propertyRepository.findOne(id),
                'property');
    }

    async createPropertyByProductId(productId: number, createDto: CreatePropertyDto) {
        const product = await this.productService.getProductById(productId);
        const property = await this.propertyRepository.create(createDto);
        property.product = product;
        return await this.propertyRepository.save(property);
    }

    async updateProperty(id: number, updateDto: UpdatePropertyDto) {
        return await this.propertyRepository.update(id, updateDto);
    }

    async deleteProperty(id: number) {
        return await this.propertyRepository.delete(id);
    }
}
