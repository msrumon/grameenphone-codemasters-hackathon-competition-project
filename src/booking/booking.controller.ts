import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppGuard } from 'src/auth/app.guard';
import { BookingDto } from './booking.dto';
import { BookingService } from './booking.service';

@Controller('bookings')
@UseGuards(new AppGuard())
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async listAllBookings() {
    return {
      statusCode: HttpStatus.OK,
      list: await this.bookingService.listing(),
    };
  }

  @Post()
  async makeBooking(@Body() bookingDto: BookingDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Booking placed successfully!',
      ...(await this.bookingService.book(bookingDto)),
    };
  }

  @Post(':id/close')
  async closeBooking(@Param() id: number) {
    return {
      statusCode: HttpStatus.NO_CONTENT,
      ...(await this.bookingService.leave(id)),
    };
  }
}
