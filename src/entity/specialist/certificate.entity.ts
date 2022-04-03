import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Specialist} from './specialist.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Certificate {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    imageUrl: string;

    @ManyToOne(() => Specialist)
    specialist: Specialist;
}
