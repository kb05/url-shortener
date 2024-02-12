import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import { isDomainError, } from "@src/framework/clean-architecture/domain/errors/is-domain-error";
import { ShortURLRegistryService, } from "@src/modules/stats/application/services/short-url-registry.service";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


@Injectable()
export class AddRequestToShortURLRegistryUseCase extends UseCase {
    
    constructor(
        private readonly URLRegistryService : ShortURLRegistryService,
    ) {
        super(); 
    }

    async perform({ shortURLEquivalenceId, } : {
        shortURLEquivalenceId : ShortURLEquivalence["id"]
    }) {

        const URLRegistry = await this.URLRegistryService.getByShortURLEquivalenceId(shortURLEquivalenceId);
        
        if (isDomainError(URLRegistry)) {
            return URLRegistry;
        }

        URLRegistry.numberOfRequests += 1;

        return this.URLRegistryService.saveModel(URLRegistry);
    }
}
