import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from './product.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Property {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column('decimal')
    price: number;

    @ManyToOne(() => Product, (product) => product.property)
    product: Product;
}
