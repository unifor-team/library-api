import { Controller,Post, Body, Get, Param, Put, Delete} from "@nestjs/common";
import { CreateBookDTO } from "src/models/book/create-dto";
import { EditBookDTO } from "src/models/book/edit-dto";
import { BookService } from "src/services/book.service";

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Post()
    create(@Body() request: CreateBookDTO){
        return this.bookService.create(request);
    }

    @Put(":id")
    update(@Body() request: EditBookDTO, @Param('id') id:string){
        return this.bookService.update(id, request);
    }

    @Get()
    list(){
        return this.bookService.listAll();
    }
    @Get(":id")
    listById(@Param('id') id: string){
        return this.bookService.listById(id);
    }
    @Delete(":id")
    delete(@Param('id')id: string){
        return this.bookService.delete(id);
    }
}