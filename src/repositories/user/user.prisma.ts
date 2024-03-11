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
}