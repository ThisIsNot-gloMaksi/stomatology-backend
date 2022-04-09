import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {Property} from '../properties/property.entity';
import {ApiProperty} from '@nestjs/swagger';
import {Category} from "../categoryies/category.entity";

@Entity()
export class Product {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        name: 'article_number',
    })
    articleNumber: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column('text')
    description: string;

    @ApiProperty()
    @Column('decimal')
    minPrice: number;

    @ApiProperty()
    @OneToMany(() => Property, (property) => property.product)
    property: Property[];

    @ApiProperty()
    @ManyToMany(() => Category)
    @JoinTable()
    category: Category[];
}
