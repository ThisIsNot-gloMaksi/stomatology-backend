import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {IsDate} from "class-validator";
import {Type} from "class-transformer";

@Entity()
export class Feedback {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    estimation: number;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    @Column()
    date: Date;
}
