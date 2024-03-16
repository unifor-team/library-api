import { Module } from '@nestjs/common';
import { EditionController } from 'src/controllers/edition.controller';
import { PrismaService } from 'src/prisma.service';
import { EditionRepository } from 'src/repositories/edition/edition.prisma';
import { EditionService } from 'src/services/edition.service';


@Module({
  imports: [],
  controllers: [EditionController],
  providers: [EditionService, EditionRepository, PrismaService],
})
export class EditionModule { }
