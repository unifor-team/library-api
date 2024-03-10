import { Module } from '@nestjs/common';
import { BookModule, EditionModule, PostModule, UserModule } from './modules';

@Module({
  imports: [UserModule, BookModule, EditionModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
