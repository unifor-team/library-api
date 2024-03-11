import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from 'src/repositories/user/user.prisma';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class UserModule { }
