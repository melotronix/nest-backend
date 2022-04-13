import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({example: 'string', description: 'Название поста'})
  @IsString({message: 'Данное поле должно быть строковым!'})
  readonly title: string;

  @ApiProperty({example: 'string', description: 'Контент поста'})
  @IsString({message: 'Данное поле должно быть строковым!'})
  readonly content: string;

  @ApiProperty({example: 'string', description: 'ID пользователя-владельца'})
  @IsString({message: 'Данное поле должно быть строковым!'})
  readonly userId: number;
}