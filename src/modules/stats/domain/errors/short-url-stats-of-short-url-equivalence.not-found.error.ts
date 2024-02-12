import { NotFoundDomainError, } from "@src/framework/clean-architecture/domain/errors/not-found.error";
import { Documentation, } from "@src/framework/documentation/documentation";
import {
    EntityIdExample, IsEntityId, 
} from "@src/framework/validators/is-entity-id";
import { ShortURLStats, } from "@src/modules/stats/domain/models/short-url-stats.model";


export class ShortURLStatsOfShortURLEquivalenceNotFoundError extends NotFoundDomainError {
    private __nominal! : void;

    @Documentation({
        description : "The id of the not found short url stats",
        example     : EntityIdExample,        
    })
    @IsEntityId()
    public shortURLEquivalenceId ! : ShortURLStats["shortURLEquivalenceId"];
    
    
    public describe() : string {
        return `The short URL stats related to the shortURLEquivalence ${this.shortURLEquivalenceId} was not found.`;
    }
    
}
