import { Module } from '@nestjs/common';
import { AppController } from './adapters/controllers/app.controller';
import { AppService } from './application/services/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class UrlShortenerModule {}
