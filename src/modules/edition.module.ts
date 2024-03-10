import { Module } from '@nestjs/common';
import { EditionController } from 'src/controllers/edition.controller';
import { EditionService } from 'src/services/edition.controller';

@Module({
  imports: [],
  controllers: [EditionController],
  providers: [EditionService],
})
export class EditionModule { }
