import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService)  {
  }

  @Post('/login')
  private signIn(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto);
  }

  @Post('/registration')
  private signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }
}
