import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomDto } from './room.dto';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}

  public async listing() {
    const rooms = await this.roomRepository.find();

    if (rooms.length < 1) {
      throw new NotFoundException('No rooms found!');
    }

    return rooms;
  }

  public async store(roomDto: RoomDto) {
    const ex = await this.roomRepository.findOne({
      where: { number: roomDto.number },
    });

    if (ex) {
      throw new ForbiddenException('This number is already occupied!');
    }

    const room = new Room();
    room.number = roomDto.number;
    room.type = roomDto.type;
    room.price = roomDto.price;
    room.maxPersons = roomDto.max;
    await this.roomRepository.save(room);

    return { room };
  }
}
