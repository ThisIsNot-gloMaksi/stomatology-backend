import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  @Column()
  date: Date;
}
