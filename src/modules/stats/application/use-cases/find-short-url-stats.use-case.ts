import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import { isDomainError, } from "@src/framework/clean-architecture/domain/errors/is-domain-error";
import { ShortURLStatsService, } from "@src/modules/stats/application/services/short-url-equivalence.service";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


@Injectable()
export class IncreaseShortURLStatsUseCase extends UseCase {
    
    constructor(
        private readonly shortURLStatsService : ShortURLStatsService,
    ) {
        super(); 
    }

    async perform({ shortURLEquivalenceId, } : {
        shortURLEquivalenceId : ShortURLEquivalence["id"]
    }) {

        const shortURLStats = await this.shortURLStatsService.getByShortURLEquivalenceId(shortURLEquivalenceId);
        
        if (isDomainError(shortURLStats)) {
            return shortURLStats;
        }

        shortURLStats.numberOfRequests += 1;

        return this.shortURLStatsService.saveModel(shortURLStats);
    }
}
