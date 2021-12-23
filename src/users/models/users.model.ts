import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({tableName: 'Users'})
export class User extends Model<User, UserCreationAttributes > {
  @ApiProperty({example: 'integer', description: 'Уникальный ID пользователя'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({example: 'string', description: 'Email пользователя'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({example: 'string', description: 'Пароль пользователя'})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({example: 'bool', description: 'Флаг бана (забанен пользователь или нет)'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;

  @ApiProperty({example: 'string', description: 'Причина бана (если есть)'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string;
}