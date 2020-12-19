import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CustomerDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;
}
