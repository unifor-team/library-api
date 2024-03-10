import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.DEFAULT_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}

bootstrap();
