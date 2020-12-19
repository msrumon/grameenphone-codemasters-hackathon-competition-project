import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() userDto: UserDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully!',
      ...(await this.authService.findOrStore(userDto.email, userDto.password)),
    };
  }

  @Post('login')
  async authUser(@Body() userDto: UserDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Authenticated!',
      ...(await this.authService.authOrFail(userDto.email, userDto.password)),
    };
  }
}
