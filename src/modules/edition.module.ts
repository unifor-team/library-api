import { Module } from '@nestjs/common';
import { EditionController } from 'src/controllers/edition.controller';
import { PrismaService } from 'src/prisma.service';
import { EditionService } from 'src/services/edition.controller';

@Module({
  imports: [],
  controllers: [EditionController],
  providers: [EditionService, PrismaService],
})
export class EditionModule { }
