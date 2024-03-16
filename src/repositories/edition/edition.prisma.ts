import { Injectable } from "@nestjs/common";
import { Edition } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EditionRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: Edition) {
    return this.prisma.edition.create({
      data
    });
  }

  async update(id: string, data: Edition) {
    return this.prisma.edition.update({
      where: {
        id,
      },
      data,
    })
  }

  async list() {
    return this.prisma.edition.findMany();
  }

  async listById(id: string) {
    return this.prisma.edition.findFirst({
      where: {
        id,
      },
    })
  }

  async delete(id: string) {
    return this.prisma.edition.delete({
      where: {
        id,
      },
      
    })
  }
}