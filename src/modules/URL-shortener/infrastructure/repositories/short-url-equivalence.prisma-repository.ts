import { Injectable, } from "@nestjs/common";
import {
    PrismaShortURLEquivalence, 
} from "@prisma/client";
import {
    generatePrismaCrudRepository,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/generate-prisma-crud-repository";
import {
    generateVirtualPrismaRepositoryReference,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/generate-virtual-prisma-repository-reference";
import { CreationPrismaEntityFields, } from "@src/framework/clean-architecture/infrastructure/repositories/prisma/prisma.types";

import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import {
    CreateShortURLEquivalence,
} from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { ShortURLEquivalenceRepository, } from "@src/modules/URL-shortener/domain/repositories/short-url-equivalence.repository";


@Injectable()
export class ShortURLEquivalencePrismaRepository extends generatePrismaCrudRepository({
    CreateModelInformationClass : CreateShortURLEquivalence,
    ModelClass                  : ShortURLEquivalence,
    entityVirtualPrismaRepository:
        generateVirtualPrismaRepositoryReference<PrismaShortURLEquivalence, "prismaShortURLEquivalence">("prismaShortURLEquivalence"),
}) implements ShortURLEquivalenceRepository {
   
    
    async entityToModel
    (
        entity : PrismaShortURLEquivalence
    ) {
        return transformAndValidate(ShortURLEquivalence, {
            ...entity, 
        });
    }
    
    modelToEntity(model : ShortURLEquivalence) : PrismaShortURLEquivalence{
        return {
            createdAt : model.createdAt,
            id        : model.id,
            shortUUID : model.shortUUID,
            updatedAt : model.updatedAt,
            url       : model.url,
        };
    }

    createModelInformationToEntity(
        createModelInformation : CreateShortURLEquivalence
    ) : CreationPrismaEntityFields<PrismaShortURLEquivalence> {
        return {
            shortUUID : createModelInformation.shortUUID,
            url       : createModelInformation.url,
        };
      
    }

    async findByURL(url : string) : Promise<ShortURLEquivalence | undefined> {        
        const shortURLEquivalence = await this.internalPrismaRepository.findFirst({
            where: {
                url,
            },
        });

        if (!shortURLEquivalence) {
            return undefined;
        }

        return this.entityToModel(shortURLEquivalence);
    }

    async findByShortUUID(shortUUID : string) : Promise<ShortURLEquivalence | undefined> {
        const shortURLEquivalence = await this.internalPrismaRepository.findFirst({
            where: {
                shortUUID,
            },
        });

        if (!shortURLEquivalence) {
            return undefined;
        }
        
        return this.entityToModel(shortURLEquivalence);
    }

}
