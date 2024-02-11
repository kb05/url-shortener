import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import { isDomainError, } from "@src/framework/clean-architecture/domain/errors/is-domain-error";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import { CreateShortURLEquivalenceAsUser, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence-as-user.model";
import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { CreateShortURLEquivalenceResponse, } from "@src/modules/URL-shortener/domain/models/created-short-url-equivalence-response.model";


@Injectable()
export class CreateShortURLEquivalenceAsUserUseCase extends UseCase {
    
    constructor(
        private readonly shortURLEquivalenceService : ShortUrlEquivalenceService
    ) {
        super(); 
    }

    async perform({ createShortURLEquivalenceAsUser, } : {
        createShortURLEquivalenceAsUser : CreateShortURLEquivalenceAsUser
    }){
        
        const shortURLEquivalence = await this.shortURLEquivalenceService.create(
            await transformAndValidate(CreateShortURLEquivalence, {
                shortURL : createShortURLEquivalenceAsUser.short,
                url      : createShortURLEquivalenceAsUser.full,
            })
        );

        if (isDomainError(shortURLEquivalence)) {
            return shortURLEquivalence;
        }


        return transformAndValidate(CreateShortURLEquivalenceResponse, {
            url: shortURLEquivalence.shortURL,
        });
    }

}
