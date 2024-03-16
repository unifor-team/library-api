import { Module } from '@nestjs/common';
import { BookModule, EditionModule, PostModule, UserModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { PostRepository } from './repositories/Post/post.prisma';

@Module({
  imports: [
    UserModule,
    BookModule,
    EditionModule,
    PostModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    })],
  controllers: [],
  providers: [],
})
export class AppModule { }
