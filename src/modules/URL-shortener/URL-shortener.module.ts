import { Module, } from "@nestjs/common";
import { PrismaModule, } from "@src/framework/modules/prisma/prisma.module";
import { ShortURLController, } from "@src/modules/URL-shortener/adapters/controllers/app.controller";
import { AppService, } from "./application/services/app.service";

@Module({
    imports: [
        PrismaModule,
    ],
    controllers : [ShortURLController,],
    providers   : [AppService,],
})
export class URLShortenerModule {}
