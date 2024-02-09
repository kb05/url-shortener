import { Module } from '@nestjs/common';
import { UrlShortenerModule } from '@src/url-shortener/url-shortener.module';

@Module({
  imports: [UrlShortenerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
