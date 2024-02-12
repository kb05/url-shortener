import { ConflictDomainError, } from "@src/framework/clean-architecture/domain/errors/conflict.error";
import { Documentation, } from "@src/framework/documentation/documentation";
import {
    EntityIdExample, IsEntityId, 
} from "@src/framework/validators/is-entity-id";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


export class DuplicatedShortURLStatsError extends ConflictDomainError {
    private __nominal! : void;

    @Documentation({
        description : "The id of the duplicated url equivalence",
        example     : EntityIdExample,
    })
    @IsEntityId()
    public shortURLEquivalenceId ! : ShortURLEquivalence["id"];
    
    
    public describe() : string {
        return `Already exists an short url stats with the same shortURLEquivalenceId: ${this.shortURLEquivalenceId}.`;
    }
}
