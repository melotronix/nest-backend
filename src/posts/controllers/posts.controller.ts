import { Body, Controller, Post, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsService } from '../services/posts.service';

@Controller('posts')
@ApiTags('Посты')
export class PostsController {

  constructor(private postService: PostsService) {
  }

  @Post()
  cretePost(@Body() dto: CreatePostDto,
            @UploadedFile() image) {
    this.postService.createPost(dto, image);
  }

}
