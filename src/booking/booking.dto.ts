import { IsDecimal, IsEmail, IsString } from 'class-validator';
import { BookingType } from './booking.type';

export class BookingDto {
  @IsEmail()
  customer: string;

  @IsString()
  room: string;

  @IsString()
  type: BookingType;

  @IsString()
  arrival: string;

  @IsString()
  checkout: string;

  @IsDecimal()
  paid: number;
}
