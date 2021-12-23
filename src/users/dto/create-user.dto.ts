import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({example: 'string', description: 'Email пользователя'})
  readonly email: string;

  @ApiProperty({example: 'string', description: 'Пароль пользователя'})
  readonly password: string;
}