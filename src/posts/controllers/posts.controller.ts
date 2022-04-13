import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsService } from '../services/posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
@ApiTags('Посты')
export class PostsController {

  constructor(private postService: PostsService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  cretePost(@Body() dto: CreatePostDto,
            @UploadedFile() image) {
    return this.postService.createPost(dto, image);
  }

}
