import {
    generateAbstractCRUDRepository, 
} from "@src/framework/clean-architecture/domain/crud-repository";
import { CreateShortURLStats, } from "@src/modules/stats/domain/models/create-short-url-stats.model";
import { ShortURLStats, } from "@src/modules/stats/domain/models/short-url-stats.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


export abstract class ShortURLStatsRepository extends generateAbstractCRUDRepository(ShortURLStats, CreateShortURLStats) {
 
    abstract findByShortURLEquivalenceId(shortURLEquivalenceId : ShortURLEquivalence["id"]) : Promise<ShortURLStats|undefined>
}
