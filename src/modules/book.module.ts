import { Module } from '@nestjs/common';
import { BookController } from 'src/controllers/book.controller';
import { PrismaService } from 'src/prisma.service';
import { BookService } from 'src/services/book.service';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [BookService, PrismaService],
})
export class BookModule { }
