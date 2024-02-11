import { Module, } from "@nestjs/common";
import { CacheService, } from "@src/framework/modules/cache/cache.service";
import { RedisCacheService, } from "@src/framework/modules/cache/redis-cache.service";


@Module({
    providers: [{
        provide  : CacheService,
        useClass : RedisCacheService,
    },],
    exports: [CacheService,],
})
export class CacheModule {}
