import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/users.model';
import { Post } from './models/posts.model';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Post])
  ]
})
export class PostsModule {}
