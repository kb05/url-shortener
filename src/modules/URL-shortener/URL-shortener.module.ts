import { Module, } from "@nestjs/common";
import { CacheModule, } from "@src/framework/modules/cache/cache.module";
import { PrismaModule, } from "@src/framework/modules/prisma/prisma.module";
import { UUIDModule, } from "@src/framework/modules/uuid/app-resources.module";
import { ShortURLController, } from "@src/modules/URL-shortener/adapters/controllers/short-url.controller";
import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import {
    CreateShortURLEquivalenceAsUserUseCase,
} from "@src/modules/URL-shortener/application/use-cases/create-short-url-equivalence-as-user.use-case";
import { ShortURLEquivalenceRepository, } from "@src/modules/URL-shortener/domain/repositories/short-url-equivalence.repository";
import {
    ShortURLEquivalencePrismaRepository,
} from "@src/modules/URL-shortener/infrastructure/repositories/short-url-equivalence.prisma-repository";
import { ShortURLEquivalenceBuilder, } from "@src/modules/URL-shortener/infrastructure/tests/short-url-equivalence.builder";

@Module({
    imports: [
        PrismaModule,
        UUIDModule,
        CacheModule,
    ],
    controllers : [ShortURLController,],
    providers   : [
        ShortUrlEquivalenceService,
        ShortURLEquivalenceBuilder,
        CreateShortURLEquivalenceAsUserUseCase,
        {
            provide  : ShortURLEquivalenceRepository,
            useClass : ShortURLEquivalencePrismaRepository,
        },
    ],
    exports: [
        ShortUrlEquivalenceService,
    ],
})
export class URLShortenerModule {}
