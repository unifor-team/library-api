import { Module } from '@nestjs/common';
import { PostController } from 'src/controllers/post.controller';
import { PostService } from 'src/services/post.controller';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
