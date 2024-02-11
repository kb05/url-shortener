import {
    Body,
    Controller,    Post, 
} from "@nestjs/common";
import { APIController, } from "@src/framework/clean-architecture/adapters/controllers/API-controller.class";

import { DocumentAPIResponse, } from "@src/framework/documentation/document-api-response";
import { CacheService, } from "@src/framework/modules/cache/cache.service";

import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import {
    CreateShortURLEquivalenceAsUserUseCase,
} from "@src/modules/URL-shortener/application/use-cases/create-short-url-equivalence-as-user.use-case";
import { DuplicatedShortUUIDError, } from "@src/modules/URL-shortener/domain/errors/duplicated-short-uuid.error";
import { DuplicatedURLError, } from "@src/modules/URL-shortener/domain/errors/duplicated-url.error";
import {
    CreateShortURLEquivalenceAsUser,
} from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence-as-user.model";


import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";

@Controller("short-url")
export class ShortURLController implements APIController<ShortURLController> {
    constructor(
        private readonly createShortURLEquivalenceAsUserUseCase : CreateShortURLEquivalenceAsUserUseCase,
        private readonly cacheService : CacheService,
    ) { }


    static createShortUrlEquivalenceAsUserErrors = [DuplicatedShortUUIDError, DuplicatedURLError,];

    @DocumentAPIResponse({
        response : [ShortURLEquivalence,],
        errors   : ShortURLController.createShortUrlEquivalenceAsUserErrors,
    })
    @Post()
    async createUrlEquivalenceAsUser(
    @Body() createShortURLEquivalenceAsUser : CreateShortURLEquivalenceAsUser
    ) {


        return await this.cacheService.getOrSet({
            setCallback: () => transformAndValidate(ShortURLEquivalence, {
                id        : 1,
                createdAt : new Date,
                updatedAt : new Date,
                shortUUID : "te2sf",
                url       : "www.google.es",
            }),
            modelType : ShortURLEquivalence,
            cacheKey  : "tddfesf",
        }) as any;
        

        // const shortURLEquivalence = await this.createShortURLEquivalenceAsUserUseCase.perform({
        //     createShortURLEquivalenceAsUser,
        // });

        // if (isInstanceOf(shortURLEquivalence, ShortURLController.createShortUrlEquivalenceAsUserErrors)) {
        //     return domainErrorToDto(shortURLEquivalence);
        // }

        // return shortURLEquivalence;
    }
}
