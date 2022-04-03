import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDiscount: Date;

  @Column()
  endDiscount: Date;

  @Column()
  imageUrl: string;
}
