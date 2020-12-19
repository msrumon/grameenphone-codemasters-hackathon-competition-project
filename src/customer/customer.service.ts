import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDto } from './customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  public async listing() {
    const customers = await this.customerRepository.find();

    if (customers.length < 1) {
      throw new NotFoundException('No customers found!');
    }

    return customers;
  }

  public async store(customerDto: CustomerDto) {
    const ex = await this.customerRepository.findOne({
      where: [{ email: customerDto.email }, { phone: customerDto.phone }],
    });

    if (ex) {
      throw new ForbiddenException('Duplicate customers are not allowed!');
    }

    const customer = new Customer();
    customer.firstName = customerDto.first_name;
    customer.lastName = customerDto.last_name;
    customer.email = customerDto.email;
    customer.phone = customerDto.phone;
    await this.customerRepository.save(customer);

    return { customer };
  }
}
