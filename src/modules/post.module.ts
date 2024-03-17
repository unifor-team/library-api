import { Module } from '@nestjs/common';
import { PostController } from 'src/controllers/post.controller';
import { PrismaService } from 'src/prisma.service';
import { PostRepository } from 'src/repositories/post/post.prisma';
import { PostService } from 'src/services/post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PrismaService, PostRepository],
})
export class PostModule { }
