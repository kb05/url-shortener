import { Injectable, } from "@nestjs/common";
import { CacheService, } from "@src/framework/modules/cache/cache.service";
import { ApplicationLogger, } from "@src/framework/modules/global-resources/logger/logger";
import { PrismaService, } from "@src/framework/modules/prisma/prisma.service";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { ShortURLEquivalencePrismaRepository, } from "@src/modules/URL-shortener/infrastructure/repositories/short-url-equivalence.prisma-repository";


@Injectable()
export class ShortURLEquivalencePrismaCacheRepository extends ShortURLEquivalencePrismaRepository {

    constructor(
        private readonly applicationLogger : ApplicationLogger,
        private readonly cacheService : CacheService,
        prismaService : PrismaService
    ) {
        super(prismaService);
    }

    private getShortUUIDKey(shortUUID : string) : string { 
        return `short-uuid-${shortUUID}`;
    }

    public async saveModel(model : ShortURLEquivalence) : Promise<ShortURLEquivalence> {
        const storedModel = await super.saveModel(model);

        // It is not necessary to block the flow until the data is stored in the cache
        this.cacheService.saveModel({
            cacheKey : this.getShortUUIDKey(model.shortUUID),
            model    : storedModel,
        }).catch(error => this.applicationLogger.error(error));
  

        return storedModel;
    }

    async findByShortUUID(shortUUID : string) : Promise<ShortURLEquivalence | undefined> {
        return this.cacheService.getOrSet({
            modelType   : ShortURLEquivalence,
            cacheKey    : this.getShortUUIDKey(shortUUID),
            setCallback : ()=> super.findByShortUUID(shortUUID),
        });
    }
   
    
}
