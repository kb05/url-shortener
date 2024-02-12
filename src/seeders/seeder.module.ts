import { Module, } from "@nestjs/common";
import { GlobalResources, } from "@src/framework/modules/global-resources/global-resources.module";
import { StatsModule, } from "@src/modules/stats/stats.module";
import { URLShortenerModule, } from "@src/modules/URL-shortener/URL-shortener.module";
import { SeederService, } from "@src/seeders/seeder.service";


@Module({
    imports: [
        GlobalResources,
        URLShortenerModule,
        StatsModule,
    ],
    providers: [
        SeederService,
    ],
})
export class SeederModule {}
