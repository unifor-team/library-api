import { Module } from '@nestjs/common';
import { PostController } from 'src/controllers/post.controller';
import { PrismaService } from 'src/prisma.service';
import { PostService } from 'src/services/post.controller';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule { }
