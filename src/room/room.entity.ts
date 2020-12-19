import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  number: string;

  @Column('varchar')
  type: string;

  @Column('decimal')
  price: number;

  @Column('int')
  maxPersons: number;

  @Column('int', { default: 0 })
  occupiedPersons: number;

  @Column('boolean', { default: false })
  isLocked: boolean;
}
