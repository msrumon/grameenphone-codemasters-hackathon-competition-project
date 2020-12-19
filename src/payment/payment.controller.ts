import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/auth/app.guard';

@Controller('payments')
@UseGuards(new AppGuard())
export class PaymentController {
  @Get()
  listAllPayments() {
    return 'All Payments';
  }

  @Post()
  makePayment() {
    return 'Make Payment';
  }
}
