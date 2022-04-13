import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({example: 'string', description: 'Email пользователя'})
  @IsString({message: 'Данное поле должно быть строкой!'})
  @IsEmail({},{message: 'Неверный формат E-mail адреса!'})
  readonly email: string;

  @ApiProperty({example: 'string', description: 'Пароль пользователя'})
  @IsString({message: 'Поле пароля должно являться строкой!'})
  @Length(4, 16, {message: 'Минимум 4 символа, максимум 16 символов'})
  readonly password: string;
}