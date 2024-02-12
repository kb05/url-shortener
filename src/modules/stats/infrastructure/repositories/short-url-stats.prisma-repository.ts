import { Injectable, } from "@nestjs/common";
import {
    PrismaShortURLStats, 
} from "@prisma/client";
import {
    generatePrismaCrudRepository,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/generate-prisma-crud-repository";
import {
    generateVirtualPrismaRepositoryReference,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/generate-virtual-prisma-repository-reference";
import { CreationPrismaEntityFields, } from "@src/framework/clean-architecture/infrastructure/repositories/prisma/prisma.types";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { CreateShortURLStats, } from "@src/modules/stats/domain/models/create-short-url-stats.model";
import { ShortURLStats, } from "@src/modules/stats/domain/models/short-url-stats.model";
import { ShortURLStatsRepository, } from "@src/modules/stats/domain/repositories/short-url-stats.repository";


@Injectable()
export class ShortURLStatsPrismaRepository extends generatePrismaCrudRepository({
    CreateModelInformationClass : CreateShortURLStats,
    ModelClass                  : ShortURLStats,
    entityVirtualPrismaRepository:
    generateVirtualPrismaRepositoryReference<PrismaShortURLStats, "prismaShortURLStats">("prismaShortURLStats"),
}) implements ShortURLStatsRepository {
    
    async entityToModel
    (
        entity : PrismaShortURLStats
    ) {
        return transformAndValidate(ShortURLStats, {
            ...entity, 
        });
    }
    
    modelToEntity(model : ShortURLStats) : PrismaShortURLStats{
        return {
            id                    : model.id,
            createdAt             : model.createdAt,
            updatedAt             : model.updatedAt,
            numberOfRequests      : model.numberOfRequests,
            shortURLEquivalenceId : model.shortURLEquivalenceId,
        };
    }

    createModelInformationToEntity(
        createModelInformation : CreateShortURLStats
    ) : CreationPrismaEntityFields<PrismaShortURLStats> {
        return {
            numberOfRequests      : createModelInformation.numberOfRequests,
            shortURLEquivalenceId : createModelInformation.shortURLEquivalenceId,
        };
      
    }

    
    async findByShortURLEquivalenceId(shortURLEquivalenceId : number) : Promise<ShortURLStats | undefined> {
        
        const entity = await this.internalPrismaRepository.findFirst({
            where: {
                shortURLEquivalenceId,
            },
        });

        if (!entity) {
            return undefined;
        }

        return this.entityToModel(entity);
    }

}
