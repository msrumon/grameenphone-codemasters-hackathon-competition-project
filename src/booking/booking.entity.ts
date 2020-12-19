import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Payment } from '../payment/payment.entity';
import { Room } from '../room/room.entity';
import { BookingType } from './booking.type';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @OneToOne(() => Room)
  @JoinColumn()
  room: Room;

  @Column('varchar')
  type: BookingType;

  @Column('datetime')
  arriveAt: Date;

  @Column('datetime')
  checkoutAt: Date;

  @OneToOne(() => Payment)
  payment: Payment;

  @CreateDateColumn()
  bookedAt: Date;
}
