import {
    Body,
    Controller,    Post, 
} from "@nestjs/common";
import { APIController, } from "@src/framework/clean-architecture/adapters/controllers/API-controller.class";
import { domainErrorToDto, } from "@src/framework/clean-architecture/adapters/controllers/domain-error-to-dto";
import { DocumentAPIResponse, } from "@src/framework/documentation/document-api-response";
import { isInstanceOf, } from "@src/framework/types/type-utils";
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
        
        const shortURLEquivalence = await this.createShortURLEquivalenceAsUserUseCase.perform({
            createShortURLEquivalenceAsUser,
        });

        if (isInstanceOf(shortURLEquivalence, ShortURLController.createShortUrlEquivalenceAsUserErrors)) {
            return domainErrorToDto(shortURLEquivalence);
        }

        return shortURLEquivalence;
    }
}
