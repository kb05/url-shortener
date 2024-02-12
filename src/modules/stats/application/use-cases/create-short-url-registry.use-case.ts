import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortURLRegistryService, } from "@src/modules/stats/application/services/short-url-registry.service";
import { CreateShortURLRegistry, } from "@src/modules/stats/domain/models/create-short-url-registry.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


const defaultStatsProperties = {
    numberOfRequests: 0,
} satisfies Partial<CreateShortURLRegistry>;


@Injectable()
export class CreateShortURLRegistryUseCase extends UseCase {
    
    constructor(
        private readonly URLRegistryService : ShortURLRegistryService,
    ) {
        super(); 
    }

    async perform({ shortURLEquivalenceId, } : {
        shortURLEquivalenceId : ShortURLEquivalence["id"]
    }) {
        
        return this.URLRegistryService.create(
            await transformAndValidate(CreateShortURLRegistry,
                {
                    ...defaultStatsProperties,
                    shortURLEquivalenceId,
                }
            )
        );
    }
}
