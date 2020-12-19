import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { unique: true })
  phone: string;

  @CreateDateColumn()
  registeredAt: Date;
}
