import { Module, } from "@nestjs/common";
import { PrismaModule, } from "@src/framework/modules/prisma/prisma.module";
import { AppController, } from "./adapters/controllers/app.controller";
import { AppService, } from "./application/services/app.service";

@Module({
    imports: [
        PrismaModule,
    ],
    controllers : [AppController,],
    providers   : [AppService,],
})
export class URLShortenerModule {}
