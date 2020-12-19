import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppGuard } from '../auth/app.guard';
import { CustomerDto } from './customer.dto';
import { CustomerService } from './customer.service';

@Controller('customers')
@UseGuards(new AppGuard())
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async listAllCustomers() {
    return {
      statusCode: HttpStatus.OK,
      list: await this.customerService.listing(),
    };
  }

  @Post()
  async createCustomer(@Body() customerDto: CustomerDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Customer created successfully!',
      ...(await this.customerService.store(customerDto)),
    };
  }
}
