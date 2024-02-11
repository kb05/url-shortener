import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import { isDomainError, } from "@src/framework/clean-architecture/domain/errors/is-domain-error";
import { env, } from "@src/framework/environment/env";
import { ApplicationLogger, } from "@src/framework/modules/global-resources/logger.class";
import { UUIDService, } from "@src/framework/modules/uuid/uuid.service";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import { CreateShortURLEquivalenceAsUser, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence-as-user.model";
import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { CreateShortURLEquivalenceResponse, } from "@src/modules/URL-shortener/domain/models/created-short-url-equivalence-response.model";


import { retryAsPromised, } from "retry-as-promised";

const URL_LENGTH = 10;

@Injectable()
export class CreateShortURLEquivalenceAsUserUseCase extends UseCase {
    
    constructor(
        private readonly shortURLEquivalenceService : ShortUrlEquivalenceService,
        private readonly uuidService : UUIDService,
        private readonly applicationLogger : ApplicationLogger
    ) {
        super(); 
    }

    async perform({ createShortURLEquivalenceAsUser, } : {
        createShortURLEquivalenceAsUser : CreateShortURLEquivalenceAsUser
    }) {
        
        const shortURL = createShortURLEquivalenceAsUser.short
            ? createShortURLEquivalenceAsUser.short
            : await this.generateShortedURL(
                createShortURLEquivalenceAsUser.full
            );

        
        const shortURLEquivalence = await this.shortURLEquivalenceService.create(
            await transformAndValidate(CreateShortURLEquivalence, {
                url: createShortURLEquivalenceAsUser.full,
                shortURL,
            })
        );

        if (isDomainError(shortURLEquivalence)) {
            return shortURLEquivalence;
        }


        return transformAndValidate(CreateShortURLEquivalenceResponse, {
            url: shortURLEquivalence.shortURL,
        });
    }


    private generateShortedURL(url : string) : Promise<string>{

        // All the algorithms are pseudorandom, also the string space is lower than the url space so we could have
        // repeated codes, the possibility is so reduced but we need to be prepared for that
        const shortedURL = retryAsPromised(async () => { 
            const uuid = this.uuidService.getShortUUID(URL_LENGTH);

            const newURL = `${env.applicationDomain}/${uuid}`;

            return newURL;
        }, {
            max   : 3,
            match : (value : unknown) => !!value,
        });

        if (!shortedURL) {
            
            this.applicationLogger.error({
                message: "It was not possible generated the shorted url",
                url,
            });

            throw new Error("Could not generate shorted URL");
        }

        return shortedURL;

    }

}
