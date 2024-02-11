import { Module, } from "@nestjs/common";
import { GlobalResources, } from "@src/framework/modules/global-resources/global-resources.module";
import { URLShortenerModule, } from "@src/modules/URL-shortener/URL-shortener.module";


@Module({
    imports: [
        GlobalResources,
        URLShortenerModule,
    ],
    controllers : [],
    providers   : [],
})
export class AppModule {}
