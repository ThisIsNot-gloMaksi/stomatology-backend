import {Column, Entity, ManyToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Product} from './product.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Category {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column('text')
    description: string;


    @ManyToMany(() => Product)
    product: Product;
}
