import {Injectable} from '@nestjs/common';
import {CreatePropertyDto, UpdatePropertyDto} from './property.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Property} from './property.entity';
import {Repository} from 'typeorm';
import {ProductService} from '../products/product.service';
import {ControllerExceptions} from "../valid/controller.valid";

@Injectable()
export class PropertyService {
    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,
        private readonly productService: ProductService,
        private readonly controllerExceptions: ControllerExceptions
    ) {
    }

    getPropertiesByProductId(productId: number) {
        return this.controllerExceptions.notUndefinedPromise(
            this.productService
                .getProductById(productId)
                .then((it) => it.property),
            'properties'
        );
    }

    getPropertyById(id: number) {
        return this.controllerExceptions.notUndefinedPromise(this.propertyRepository.findOne(id),
            'property');
    }

    createPropertyByProductId(productId: number, createDto: CreatePropertyDto) {
        const product = this.productService.getProductById(productId);
        const property = this.propertyRepository.create(createDto);
        return product.then((it) => {
            property.product = it;
            return this.propertyRepository.save(property);
        });
    }

    updateProperty(id: number, updateDto: UpdatePropertyDto) {
        return this.propertyRepository.update(id, updateDto);
    }

    deleteProperty(id: number) {
        this.propertyRepository.delete(id);
    }
}
