import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: User) {
    return this.prisma.user.create({
      data
    });
  }

  async update(id: string, data: User) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    })
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async listById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    })
  }

  async delete(id: string, data: User) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data
    })
  }
}