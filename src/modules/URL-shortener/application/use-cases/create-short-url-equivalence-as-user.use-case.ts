import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import { isDomainError, } from "@src/framework/clean-architecture/domain/errors/is-domain-error";
import { env, } from "@src/framework/environment/env";


import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import { CreateShortURLEquivalenceAsUser, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence-as-user.model";
import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { CreateShortURLEquivalenceResponse, } from "@src/modules/URL-shortener/domain/models/created-short-url-equivalence-response.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


@Injectable()
export class CreateShortURLEquivalenceAsUserUseCase extends UseCase {
    
    constructor(
        private readonly shortURLEquivalenceService : ShortUrlEquivalenceService,
    ) {
        super(); 
    }

    async perform({ createShortURLEquivalenceAsUser, } : {
        createShortURLEquivalenceAsUser : CreateShortURLEquivalenceAsUser
    }) {
        
        const shortUUID = createShortURLEquivalenceAsUser.short
            ? createShortURLEquivalenceAsUser.short
            : await this.shortURLEquivalenceService.generateNewShortedUUID();

        
        const shortURLEquivalence = await this.shortURLEquivalenceService.create(
            await transformAndValidate(CreateShortURLEquivalence, {
                url       : createShortURLEquivalenceAsUser.full,
                shortUUID : shortUUID,
            })
        );

        if (isDomainError(shortURLEquivalence)) {
            return shortURLEquivalence;
        }
        
        const url = this.generateURLFromShortEquivalence(shortURLEquivalence);

        return transformAndValidate(CreateShortURLEquivalenceResponse, {
            url: url.toString(),
        });
    }


    private generateURLFromShortEquivalence(shortURLEquivalence : ShortURLEquivalence) : URL { 
        const url = new URL(env.applicationDomain);

        url.pathname = `/short-url/${shortURLEquivalence.shortUUID}`;

        return url;
    }

}
