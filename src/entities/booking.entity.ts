import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Room } from './room.entity';

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @OneToOne(() => Room)
  @JoinColumn()
  room: Room;

  @Column('datetime')
  arrivedAt: Date;

  @Column('datetime')
  checkedInAt: Date;

  @Column('datetime')
  bookedAt: Date;
}
