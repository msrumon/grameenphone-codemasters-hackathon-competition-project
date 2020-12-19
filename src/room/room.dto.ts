import { IsDecimal, IsInt, IsString } from 'class-validator';

export class RoomDto {
  @IsString()
  number: string;

  @IsString()
  type: string;

  @IsDecimal()
  price: number;

  @IsInt()
  max: number;
}
