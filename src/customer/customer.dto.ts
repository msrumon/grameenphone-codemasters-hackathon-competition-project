import { IsString } from 'class-validator';

export class CustomerDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;
}
