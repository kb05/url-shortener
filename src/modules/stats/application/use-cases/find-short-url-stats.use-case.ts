import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import { ShortURLStatsPaginationInput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-input.model";
import { ShortURLStatsRepository, } from "@src/modules/stats/domain/repositories/short-url-stats.repository";


@Injectable()
export class FindShortURLStatsUseCase extends UseCase {
    
    constructor(
        private shortURLStatsRepository : ShortURLStatsRepository
    ) { 
        super();
    }

    async perform({ shortURLStatsPaginationInput, } : {
        shortURLStatsPaginationInput : ShortURLStatsPaginationInput,
    }) {

        return this.shortURLStatsRepository.findByPaginated(shortURLStatsPaginationInput);
    }
}
