import { Injectable, } from "@nestjs/common";
import { PrismaShortURLEquivalence, } from "@prisma/client";
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


@Injectable()
export class ShortURLEquivalencePrismaRepository extends generatePrismaCrudRepository({
    CreateModelInformationClass   : CreateShortURLEquivalence,
    ModelClass                    : ShortURLEquivalence,
    entityVirtualPrismaRepository : generateVirtualPrismaRepositoryReference<PrismaShortURLEquivalence>("shortURLEquivalence"),
}) {
       
    async entityToModel
    (
        entity : ShortURLEquivalence
    ) : Promise<ShortURLEquivalence> {
        const result = await transformAndValidate(ShortURLEquivalence, entity);

        return result;
    }
  
    
    modelToEntity(model : ShortURLEquivalence) : PrismaShortURLEquivalence {
        return {
            createdAt : model.createdAt,
            id        : model.id,
            shortURL  : model.shortURL,
            updatedAt : model.updatedAt,
            url       : model.url,
        };
    }

    createModelInformationToEntity(createModelInformation : CreateShortURLEquivalence) : CreationPrismaEntityFields<PrismaShortURLEquivalence> {
        return {
            shortURL : createModelInformation.shortURL,
            url      : createModelInformation.url,
        };
      
    }


    public test() {
        
        return this.internalPrismaRepository.findFirst({
            where: {},
        });
        
    }

}
