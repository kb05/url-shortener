import { Injectable, } from "@nestjs/common";
import {
    PrismaShortURLRegistry, 
} from "@prisma/client";
import {
    generatePrismaCrudRepository,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/generate-prisma-crud-repository";
import {
    generateVirtualPrismaRepositoryReference,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/generate-virtual-prisma-repository-reference";
import { CreationPrismaEntityFields, } from "@src/framework/clean-architecture/infrastructure/repositories/prisma/prisma.types";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { CreateShortURLRegistry, } from "@src/modules/stats/domain/models/create-short-url-registry.model";
import { ShortURLRegistryPaginationInput, } from "@src/modules/stats/domain/models/short-url-registry-pagination-input.model";
import { ShortURLRegistryPaginationOutput, } from "@src/modules/stats/domain/models/short-url-registry-pagination-output.model";
import { ShortURLRegistry, } from "@src/modules/stats/domain/models/short-url-registry.model";
import { ShortURLRegistryRepository, } from "@src/modules/stats/domain/repositories/short-url-registry.repository";


@Injectable()
export class ShortURLRegistryPrismaRepository extends generatePrismaCrudRepository({
    CreateModelInformationClass : CreateShortURLRegistry,
    ModelClass                  : ShortURLRegistry,
    entityVirtualPrismaRepository:
    generateVirtualPrismaRepositoryReference<PrismaShortURLRegistry, "prismaShortURLRegistry">("prismaShortURLRegistry"),
}) implements ShortURLRegistryRepository {
    
    async entityToModel
    (
        entity : PrismaShortURLRegistry
    ) {
        return transformAndValidate(ShortURLRegistry, {
            ...entity, 
        });
    }
    
    modelToEntity(model : ShortURLRegistry) : PrismaShortURLRegistry{
        return {
            id                    : model.id,
            createdAt             : model.createdAt,
            updatedAt             : model.updatedAt,
            numberOfRequests      : model.numberOfRequests,
            shortURLEquivalenceId : model.shortURLEquivalenceId,
        };
    }

    createModelInformationToEntity(
        createModelInformation : CreateShortURLRegistry
    ) : CreationPrismaEntityFields<PrismaShortURLRegistry> {
        return {
            numberOfRequests      : createModelInformation.numberOfRequests,
            shortURLEquivalenceId : createModelInformation.shortURLEquivalenceId,
        };
      
    }

    
    async findByShortURLEquivalenceId(shortURLEquivalenceId : number) : Promise<ShortURLRegistry | undefined> {
        
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

    async findByPaginated(URLRegistryPaginationInput : ShortURLRegistryPaginationInput) : Promise<ShortURLRegistryPaginationOutput> {
        
        const paginatedEntities = await this.findPaginated({
            options: {
                where: {
                    id: URLRegistryPaginationInput.shortURLEquivalenceIds && {
                        in: URLRegistryPaginationInput.shortURLEquivalenceIds,
                    },
                },
            },
            pagination: {
                limit : URLRegistryPaginationInput.limit,
                page  : URLRegistryPaginationInput.page,
            },
        });
        
        return transformAndValidate(ShortURLRegistryPaginationOutput, {
            ...paginatedEntities,
            results: await Promise.all(paginatedEntities.results.map(this.entityToModel)),
        });
    }

}
