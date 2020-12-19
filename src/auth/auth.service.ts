import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findOrStore(email: string, password: string) {
    const ex = await this.userRepository.findOne({ where: { email } });

    if (ex) {
      throw new ForbiddenException('This email is already taken!');
    }

    const user = new User();
    user.email = email;
    user.password = await hash(password, 10);
    await this.userRepository.save(user);

    return { email };
  }

  public async authOrFail(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Incorrect email-password combination!');
    }

    delete user.password;
    return {
      token: sign({ ...user }, process.env.JWT_SECRET, { expiresIn: '1h' }),
    };
  }
}
