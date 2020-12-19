import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEmail, IsString } from 'class-validator';
import { BookingType } from './booking.type';

export class BookingDto {
  @ApiProperty()
  @IsEmail()
  customer: string;

  @ApiProperty()
  @IsString()
  room: string;

  @ApiProperty()
  @IsString()
  type: BookingType;

  @ApiProperty()
  @IsString()
  arrival: string;

  @ApiProperty()
  @IsString()
  checkout: string;

  @ApiProperty()
  @IsDecimal()
  paid: number;
}
