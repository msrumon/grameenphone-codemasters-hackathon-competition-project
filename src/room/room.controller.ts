import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppGuard } from '../auth/app.guard';
import { RoomDto } from './room.dto';
import { RoomService } from './room.service';

@Controller('rooms')
@UseGuards(new AppGuard())
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async listAllRooms() {
    return {
      statusCode: HttpStatus.OK,
      list: await this.roomService.listing(),
    };
  }

  @Post()
  async createRoom(@Body() roomDto: RoomDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Room created successfully!',
      ...(await this.roomService.store(roomDto)),
    };
  }
}
