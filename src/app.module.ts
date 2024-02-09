import { Module, } from "@nestjs/common";
import { URLShortenerModule, } from "@src/modules/URL-shortener/URL-shortener.module";

@Module({
    imports     : [URLShortenerModule,],
    controllers : [],
    providers   : [],
})
export class AppModule {}
