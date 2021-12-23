import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User])]
})
export class UsersModule {}
