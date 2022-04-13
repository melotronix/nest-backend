import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/models/users.model';

interface PostCreationAttributes {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({tableName: 'Posts'})
export class Post extends Model<Post, PostCreationAttributes> {
  @ApiProperty({example: 'integer', description: 'Уникальный ID поста'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({example: 'string', description: 'Уникальное название поста'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  title: string;

  @ApiProperty({example: 'string', description: 'Текстовый контент поста'})
  @Column({type: DataType.STRING, unique: false, allowNull: true})
  content: string;

  @ApiProperty({example: 'string', description: 'Название изображения'})
  @Column({type: DataType.STRING})
  image: string;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number;

  @BelongsTo(() => User)
  author: User
}