import { Module } from '@nestjs/common';
import { BookModule, EditionModule, PostModule, UserModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    UserModule,
    BookModule,
    EditionModule,
    PostModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    })],
  controllers: [],
  providers: [],
})
export class AppModule { }
