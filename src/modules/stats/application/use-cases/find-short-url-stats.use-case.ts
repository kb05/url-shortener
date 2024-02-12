import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import {
    DEFAULT_PAGE, LIMITLESS_PAGINATION, 
} from "@src/framework/clean-architecture/domain/types/page-pagination-input.model";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";

import { ShortURLStatsService, } from "@src/modules/stats/application/services/short-url-equivalence.service";
import { ShortURLStatsPaginationInput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-input.model";


import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import { ShortURLEquivalencePaginationInput, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence-pagination-input.model";


@Injectable()
export class FindURLStatsUseCase extends UseCase {
    
    constructor(
        private readonly shortURLStatsService : ShortURLStatsService,
        private readonly shortUrlEquivalenceService : ShortUrlEquivalenceService,
    ) {
        super(); 
    }

    async perform({ shortURLEquivalencePaginationInput, } : {
        shortURLEquivalencePaginationInput : ShortURLEquivalencePaginationInput,
    }) {

        const shortURLEquivalences = await this.shortUrlEquivalenceService.findByPaginated(shortURLEquivalencePaginationInput);

        const jer = await  this.shortURLStatsService.findByPaginated(
            await transformAndValidate(ShortURLStatsPaginationInput, {
                limit                  : LIMITLESS_PAGINATION,
                page                   : DEFAULT_PAGE,
                shortURLEquivalenceIds : shortURLEquivalences.results.map(shortURLEquivalence => shortURLEquivalence.id),
            })
        );

        return jer;
    }
}
