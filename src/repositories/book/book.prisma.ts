import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Books } from "@prisma/client";
import { Book } from "src/models/book/Book";

@Injectable()
export class BookRepository{
    constructor(private prisma: PrismaService){}

    async create(data:Books){
        return this.prisma.books.create({
            data
        });
    }
    async update(id:string, data: Books){
        return this.prisma.books.update({
            where: {
                id,
            },
            data,
        })
    }
    async list(){
        return this.prisma.books.findMany();

    }
    async listById(id: string){
        return this.prisma.books.findFirst({
            where: {
                id,
            },
        })
    }

    async delete( id:string, data:Book){
        return this.prisma.books.delete({
            where: {
                id,
            },
        })
    }
}