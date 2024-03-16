import { Injectable } from "@nestjs/common";
import { Posts } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: Posts) {
    return this.prisma.posts.create({
      data
    });
  }
  async list(){
    return this.prisma.posts.findMany();
  }
  async listById(id: string){
    return this.prisma.posts.findFirst({
        where:{
            id,
        },
    })
  }
  async delete (id: string){
    return this.prisma.posts.delete({
        where:{
            id,
        }
    })
  }

  async update(id: string, data: Posts) {
    return this.prisma.posts.update({
      where: {
        id,
      },
      data,
    })
  }
}