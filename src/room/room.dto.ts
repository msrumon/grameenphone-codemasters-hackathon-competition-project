import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsString } from 'class-validator';

export class RoomDto {
  @ApiProperty()
  @IsString()
  number: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsDecimal()
  price: number;

  @ApiProperty()
  @IsInt()
  max: number;
}
