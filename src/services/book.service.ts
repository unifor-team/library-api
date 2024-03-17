import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Book } from 'src/models/book/Book';
import { CreateBookDTO } from 'src/models/book/create-dto';
import { EditBookDTO } from 'src/models/book/edit-dto';
import { BookRepository } from 'src/repositories/book/book.prisma';

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository){}

  async create(book: CreateBookDTO){
    const {title, editionId, userId} = book;
    const newBook = await Book.build(title, editionId, userId);
    return this.bookRepository.create(newBook)
  }

  async update(id: string, book: EditBookDTO){
    if(!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);

    const existeBook = await this.bookRepository.listById(id);

    if(!existeBook) throw new HttpException('Book not found', HttpStatus.NOT_FOUND);

    const {title, userId, editionId} = book;
    const updateBook = await Book.build(title, userId, editionId);

    updateBook.id = existeBook.id; 
    updateBook.title = existeBook.title;
    updateBook.edition_id = existeBook.edition_id;
    return this.bookRepository.update(id,updateBook)
  }

  async listAll(){
    return this.bookRepository.list();
  }

  async listById(id: string){
    if(!id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    const existeBook = await this.bookRepository.listById(id);
    if(!existeBook) throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    return existeBook;
  }

  async delete(id: string){
    if(!id) throw new HttpException('Bad request',HttpStatus.BAD_REQUEST);
    const existeBook = await this.bookRepository.listById(id);
    if(!existeBook) throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    const book = {...existeBook}
    return this.bookRepository.delete(id, book);
  }
  }