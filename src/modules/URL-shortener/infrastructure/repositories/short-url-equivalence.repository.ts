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

import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";

import {
    CreateShortURLEquivalence,
} from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { ShortURLEquivalenceRepository, } from "@src/modules/URL-shortener/domain/repositories/short-url-equivalence.repository";


@Injectable()
export class ShortURLEquivalencePrismaRepository extends generatePrismaCrudRepository({
    CreateModelInformationClass   : CreateShortURLEquivalence,
    ModelClass                    : ShortURLEquivalence,
    entityVirtualPrismaRepository : generateVirtualPrismaRepositoryReference<PrismaShortURLEquivalence>("prismaShortURLEquivalence"),
}) implements ShortURLEquivalenceRepository {
   
    
    async entityToModel
    (
        entity : PrismaShortURLEquivalence
    ) {
        return transformAndValidate(ShortURLEquivalence, {
            ...entity, 
        });
    }
    
    modelToEntity(model : ShortURLEquivalence){
        return {
            createdAt : model.createdAt,
            id        : model.id,
            shortURL  : model.shortURL,
            updatedAt : model.updatedAt,
            url       : model.url,
        };
    }

    createModelInformationToEntity(
        createModelInformation : CreateShortURLEquivalence
    ) {
        return {
            shortURL : createModelInformation.shortURL,
            url      : createModelInformation.url,
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

    async findByShortURl(shortURL : string) : Promise<ShortURLEquivalence | undefined> {
        const shortURLEquivalence = await this.internalPrismaRepository.findFirst({
            where: {
                shortURL,
            },
        });

        if (!shortURLEquivalence) {
            return undefined;
        }

        return this.entityToModel(shortURLEquivalence);
    }

}
