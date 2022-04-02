import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({example: 'string', description: 'Значение роли (пример - ADMIN)'})
  readonly value: string;

  @ApiProperty({example: 'string', description: 'Описание роли'})
  readonly description: string;
}