import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() userDto: UserDto) {
    return this.authService.findOrStore(userDto.email, userDto.password);
  }

  @Post('login')
  authUser(@Body() userDto: UserDto) {
    return this.authService.authOrFail(userDto.email, userDto.password);
  }
}
