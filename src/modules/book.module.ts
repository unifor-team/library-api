import { Module } from '@nestjs/common';
import { BookController } from 'src/controllers/book.controller';
import { PrismaService } from 'src/prisma.service';
import { BookService } from 'src/services/book.service';
import { BookRepository } from 'src/repositories/book/book.prisma';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [BookRepository,BookService, PrismaService],
})

export class BookModule { }
