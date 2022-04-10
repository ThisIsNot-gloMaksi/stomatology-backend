import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Specialist} from '../specialists/specialist.entity';
import {ApiProperty} from '@nestjs/swagger';

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
    imageName: string;

    @ManyToOne(() => Specialist)
    specialist: Specialist;
}
