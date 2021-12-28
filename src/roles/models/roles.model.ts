import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/models/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttributes {
  value: string;
  description: string;
}

@Table({tableName: 'Roles'})
export class Role extends Model<Role, RoleCreationAttributes > {
  @ApiProperty({example: 'integer', description: 'Уникальный ID пользователя'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({example: 'admin', description: 'Уникальное значение роли пользователя'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({example: 'Администратор', description: 'Описание конкретной роли'})
  @Column({type: DataType.STRING, allowNull: true})
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}