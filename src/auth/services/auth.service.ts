import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../../users/models/users.model';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService ) {
  }

  async signIn(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  /**
   * Метод регистрации пользователя
   *
   * @param userDto
   */
  async signUp(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if(candidate) {
      throw new HttpException('Пользователь с таким E-mail уже существует!', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser({...userDto, password: hashedPassword});
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  /**
   * Метод для валидации пользователя
   *
   * @param userDto
   * @private
   */
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = bcrypt.compare(userDto.password, user.password);

    if(user && passwordEquals) {
       return user;
    }
    throw new UnauthorizedException('Неверный e-mail адрес или пароль!');
  }
}
