import { NotFoundDomainError, } from "@src/framework/clean-architecture/domain/errors/not-found.error";
import { Documentation, } from "@src/framework/documentation/documentation";
import {
    EntityIdExample, 
} from "@src/framework/validators/is-entity-id";
import { IsNotEmptyString, } from "@src/framework/validators/is-not-empty-string-validator";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


export class ShortUUIDURLEquivalenceNotFoundError extends NotFoundDomainError {
    private __nominal! : void;

    @Documentation({
        description : "The shortUUID of the not found short url equivalence",
        example     : EntityIdExample,        
    })
    @IsNotEmptyString()
    public shortUUID ! : ShortURLEquivalence["shortUUID"];
    
    
    public describe() : string {
        return `The short url equivalence with the shortUUID ${this.shortUUID} was not found.`;
    }
    
}
