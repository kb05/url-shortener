import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DomainErrorCodeInterceptor } from '@src/framework/clean-architecture/adapters/middlewares/domain-error-code.interceptor';
import { ExceptionsFilter } from '@src/framework/clean-architecture/adapters/middlewares/exceptions.filter';
import { GlobalResources } from '@src/framework/modules/global-resources/global-resources.module';
import { StatsModule } from '@src/modules/stats/stats.module';
import { URLShortenerModule } from '@src/modules/URL-shortener/URL-shortener.module';
import { UserModule } from '@src/modules/users/users.module';

@Module({
  imports: [GlobalResources, URLShortenerModule, StatsModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DomainErrorCodeInterceptor,
    },
  ],
})
export class AppModule {}
