import { Module, } from "@nestjs/common";
import { PrismaModule, } from "@src/framework/modules/prisma/prisma.module";
import { ShortURLController, } from "@src/modules/URL-shortener/adapters/controllers/app.controller";
import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";

import { ShortURLEquivalenceRepository, } from "@src/modules/URL-shortener/domain/repositories/admin.repository";
import {
    ShortURLEquivalencePrismaRepository,
} from "@src/modules/URL-shortener/infrastructure/repositories/short-url-equivalence.repository";

@Module({
    imports: [
        PrismaModule,
    ],
    controllers : [ShortURLController,],
    providers   : [
        ShortUrlEquivalenceService,
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
