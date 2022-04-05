import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Discount {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    startDiscount: Date;

    @ApiProperty()
    @Column()
    endDiscount: Date;

    @ApiProperty()
    @Column()
    imageUrl: string;
}
