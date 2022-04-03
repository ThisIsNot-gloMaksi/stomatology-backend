import {Injectable} from "@nestjs/common";
import {CreatePropertyDto, UpdatePropertyDto} from "../../dto/product/property.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Property} from "../../entity/product/property.entity";
import {Repository} from "typeorm";
import {ProductService} from "./product.service";


@Injectable()
export class PropertyService {
    constructor(@InjectRepository(Property) private readonly propertyRepository: Repository<Property>,
                private readonly productService: ProductService) {
    }

    getPropertiesByProductId(productId: number) {
        return this.productService.getProductById(productId).then(it => it.property);
    }

    getPropertyById(id: number) {
        return this.propertyRepository.findOne(id);
    }

    createPropertyByProductId(productId: number, createDto: CreatePropertyDto) {
        const product = this.productService.getProductById(productId);
        let property = this.propertyRepository.create(createDto);
        return product.then(it => {
            property.product = it;
            return this.propertyRepository.save(property);
        })
    }

    updateProperty(id: number, updateDto: UpdatePropertyDto) {
        return this.propertyRepository.update(id, updateDto);
    }

    deleteProperty(id: number) {
        this.propertyRepository.delete(id);
    }
}
