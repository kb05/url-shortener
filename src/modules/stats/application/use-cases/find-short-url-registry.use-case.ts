import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import {
    DEFAULT_PAGE, LIMITLESS_PAGINATION, 
} from "@src/framework/clean-architecture/domain/types/page-pagination-input.model";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortURLRegistryService, } from "@src/modules/stats/application/services/short-url-registry.service";


import { ShortURLRegistryPaginationInput, } from "@src/modules/stats/domain/models/short-url-registry-pagination-input.model";


import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import { ShortURLEquivalencePaginationInput, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence-pagination-input.model";


@Injectable()
export class FindURLStatsUseCase extends UseCase {
    
    constructor(
        private readonly URLRegistryService : ShortURLRegistryService,
        private readonly shortUrlEquivalenceService : ShortUrlEquivalenceService,
    ) {
        super(); 
    }

    async perform({ shortURLEquivalencePaginationInput, } : {
        shortURLEquivalencePaginationInput : ShortURLEquivalencePaginationInput,
    }) {

        const shortURLEquivalences = await this.shortUrlEquivalenceService.findByPaginated(shortURLEquivalencePaginationInput);

        const jer = await  this.URLRegistryService.findByPaginated(
            await transformAndValidate(ShortURLRegistryPaginationInput, {
                limit                  : LIMITLESS_PAGINATION,
                page                   : DEFAULT_PAGE,
                shortURLEquivalenceIds : shortURLEquivalences.results.map(shortURLEquivalence => shortURLEquivalence.id),
            })
        );

        return jer;
    }
}
