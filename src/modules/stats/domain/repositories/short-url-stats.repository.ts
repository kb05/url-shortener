import { ShortURLStatsPaginationInput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-input.model";
import { ShortURLStatsPaginationOutput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-output.model";


export abstract class ShortURLStatsRepository {
     
    abstract findByPaginated(shortURLStatsPaginationInput : ShortURLStatsPaginationInput) : Promise<ShortURLStatsPaginationOutput>

}
