import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  roomNo: number;

  @Column('varchar')
  type: string;

  @Column('decimal')
  price: number;

  @Column('int')
  maxPersons: number;

  @Column('boolean')
  isLocked: boolean;
}
