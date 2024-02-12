import { Module, } from "@nestjs/common";
import { PrismaModule, } from "@src/framework/modules/prisma/prisma.module";
import { ShortURLStatsSubscriber, } from "@src/modules/stats/adapters/controllers/short-url-stats.subscriber";
import { ShortURLStatsController, } from "@src/modules/stats/adapters/controllers/stats.controller";
import { ShortURLStatsService, } from "@src/modules/stats/application/services/short-url-equivalence.service";
import { CreateShortURLStatsUseCase, } from "@src/modules/stats/application/use-cases/create-short-url-stats.use-case";
import { ShortURLStatsRepository, } from "@src/modules/stats/domain/repositories/short-url-stats.repository";
import { ShortURLStatsPrismaRepository, } from "@src/modules/stats/infrastructure/repositories/short-url-stats.prisma-repository";
import { ShortURLStatsBuilder, } from "@src/modules/stats/infrastructure/tests/short-url-equivalence.builder";
import { URLShortenerModule, } from "@src/modules/URL-shortener/URL-shortener.module";


@Module({
    imports: [
        PrismaModule,
        URLShortenerModule,
    ],
    controllers : [ShortURLStatsController,],
    providers   : [
        ShortURLStatsSubscriber,
        ShortURLStatsService,
        CreateShortURLStatsUseCase,
        {
            provide  : ShortURLStatsRepository,
            useClass : ShortURLStatsPrismaRepository,
        },
        ShortURLStatsBuilder,
    ],
    exports: [
        ShortURLStatsService,
    ],
})
export class StatsModule {}