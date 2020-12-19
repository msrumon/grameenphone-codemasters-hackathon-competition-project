import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer.entity';
import { Payment } from 'src/payment/payment.entity';
import { Room } from 'src/room/room.entity';
import { Repository } from 'typeorm';
import { BookingDto } from './booking.dto';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  public async listing() {
    const bookings = await this.bookingRepository.find();

    if (bookings.length < 1) {
      throw new NotFoundException('No bookings found!');
    }

    return bookings;
  }

  public async book(bookingDto: BookingDto) {
    const customer = await this.customerRepository.findOne({
      where: { email: bookingDto.customer },
    });

    if (!customer) {
      throw new NotFoundException('No customer found with the given email!');
    }

    const room = await this.roomRepository.findOne({
      where: { number: bookingDto.room },
    });

    if (!room) {
      throw new NotFoundException('No room found with the given number!');
    }

    if (room.isLocked) {
      throw new BadRequestException('This room is full!');
    }

    const arrival = new Date(bookingDto.arrival);
    const checkout = new Date(bookingDto.checkout);

    if (
      arrival.toString() === 'Invalid Date' ||
      checkout.toString() === 'Invalid Date'
    ) {
      throw new BadRequestException('Invalid arrival or chechout date!');
    }

    const booking = new Booking();
    booking.customer = customer;
    booking.room = room;
    booking.type = bookingDto.type;
    booking.arriveAt = arrival;
    booking.checkoutAt = checkout;

    const payment = new Payment();
    switch (bookingDto.type) {
      case 'full':
        if (bookingDto.paid !== room.price) {
          throw new BadRequestException(
            'Paid amount must be equal to room price!',
          );
        }
        break;

      case 'partial':
        if (bookingDto.paid >= room.price) {
          throw new BadRequestException(
            'Paid amount must be less than room price!',
          );
        }
        break;

      default:
    }
    payment.amount = bookingDto.paid;
    await this.paymentRepository.save(payment);

    booking.payment = payment;
    await this.bookingRepository.save(booking);

    room.occupiedPersons += 1;
    if (room.occupiedPersons === room.maxPersons) {
      room.isLocked = true;
    }
    await this.roomRepository.save(room);

    return { booking };
  }

  public async leave(bookingId: number) {
    const booking = await this.bookingRepository.findOne(bookingId);

    if (!booking) {
      throw new NotFoundException('No booking found with the given ID!');
    }

    const { room } = booking;

    if (booking.type === 'partial') {
      const payment = new Payment();
      payment.booking = booking;
      payment.amount = room.price - booking.payment.amount;
      await this.paymentRepository.save(payment);
    }

    room.occupiedPersons -= 1;
    if (room.isLocked) {
      room.isLocked = false;
    }
    await this.roomRepository.save(room);
    await this.bookingRepository.delete(booking);

    return { message: 'Booking closed successfully!' };
  }
}
