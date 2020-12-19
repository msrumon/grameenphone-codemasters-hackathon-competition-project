import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RoomController } from './room/room.controller';
import { RoomService } from './room/room.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.js,.ts}'],
      retryAttempts: 3,
    }),
    AuthModule,
  ],
  controllers: [
    RoomController,
    CustomerController,
    BookingController,
    PaymentController,
  ],
  providers: [RoomService, CustomerService, BookingService, PaymentService],
})
export class AppModule {}
