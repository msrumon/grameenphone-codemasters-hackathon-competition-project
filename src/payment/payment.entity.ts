import {
  Column,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from '../booking/booking.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Booking)
  @JoinTable()
  booking: Booking;

  @Column('decimal')
  amount: number;

  @Column('datetime')
  paidAt: Date;
}
