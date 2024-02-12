import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortURLStatsService, } from "@src/modules/stats/application/services/short-url-equivalence.service";
import { CreateShortURLStats, } from "@src/modules/stats/domain/models/create-short-url-stats.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


const defaultStatsProperties = {
    numberOfRequests: 0,
} satisfies Partial<CreateShortURLStats>;


@Injectable()
export class CreateShortURLStatsUseCase extends UseCase {
    
    constructor(
        private readonly shortURLStatsService : ShortURLStatsService,
    ) {
        super(); 
    }

    async perform({ shortURLEquivalenceId, } : {
        shortURLEquivalenceId : ShortURLEquivalence["id"]
    }) {
        
        return this.shortURLStatsService.create(
            await transformAndValidate(CreateShortURLStats,
                {
                    ...defaultStatsProperties,
                    shortURLEquivalenceId,
                }
            )
        );
    }
}
