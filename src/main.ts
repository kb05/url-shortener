import { NestFactory } from '@nestjs/core';
import { AppModule } from './url-shortener/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
