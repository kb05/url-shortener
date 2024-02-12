import { Module, } from "@nestjs/common";
import { PrismaModule, } from "@src/framework/modules/prisma/prisma.module";
import { URLRegistryEventSubscriber, } from "@src/modules/stats/adapters/controllers/short-url-registry.event-subscriber";
import { URLRegistryController, } from "@src/modules/stats/adapters/controllers/stats.controller";
import { ShortURLRegistryService, } from "@src/modules/stats/application/services/short-url-registry.service";
import { AddRequestToShortURLRegistryUseCase, } from "@src/modules/stats/application/use-cases/add-request-to-short-url-registry.use-case";
import { CreateShortURLRegistryUseCase, } from "@src/modules/stats/application/use-cases/create-short-url-registry.use-case";
import { FindShortURLStatsUseCase, } from "@src/modules/stats/application/use-cases/find-short-url-stats.use-case";
import { ShortURLRegistryRepository, } from "@src/modules/stats/domain/repositories/short-url-registry.repository";
import { ShortURLStatsRepository, } from "@src/modules/stats/domain/repositories/short-url-stats.repository";
import { ShortURLRegistryPrismaRepository, } from "@src/modules/stats/infrastructure/repositories/short-url-registry.prisma-repository";
import { ShortURLStatsPrismaRepository, } from "@src/modules/stats/infrastructure/repositories/short-url-stats.prisma-repository";
import { ShortURLRegistryBuilder, } from "@src/modules/stats/infrastructure/tests/short-url-registry.builder";
import { URLShortenerModule, } from "@src/modules/URL-shortener/URL-shortener.module";


@Module({
    imports: [
        PrismaModule,
        URLShortenerModule,
    ],
    controllers: [
        URLRegistryController,
    ],
    providers: [
        URLRegistryEventSubscriber,
        ShortURLRegistryService,
        CreateShortURLRegistryUseCase,
        AddRequestToShortURLRegistryUseCase,
        FindShortURLStatsUseCase,
        {
            provide  : ShortURLRegistryRepository,
            useClass : ShortURLRegistryPrismaRepository,
        },
        {
            provide  : ShortURLStatsRepository,
            useClass : ShortURLStatsPrismaRepository,
        },
        ShortURLRegistryBuilder,
    ],
    exports: [
        ShortURLRegistryService,
        ShortURLRegistryBuilder,
    ],
})
export class StatsModule {}
