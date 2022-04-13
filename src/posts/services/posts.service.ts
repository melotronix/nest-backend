import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '../models/posts.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {
  }

  async createPost(dto: CreatePostDto, image) {
    const fileName = 'werwer';
    return await this.postRepository.create({ ...dto, image: fileName });
  }
}
