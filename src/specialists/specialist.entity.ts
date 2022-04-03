import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Certificate} from '../certificates/certificate.entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity()
export class Specialist {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column('varchar', {array: true})
    specialization: string[];

    @ApiProperty()
    @Column('text')
    description: string;

    @ApiProperty()
    @OneToMany(() => Certificate, (certificate) => certificate.specialist)
    certificates: Certificate[];
}
