import { DomainEvent, } from "@src/framework/clean-architecture/domain/domain-event";
import { Documentation, } from "@src/framework/documentation/documentation";
import { EntityIdExample, } from "@src/framework/validators/is-entity-id";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


export class ResolvedShortURLEquivalenceEvent extends DomainEvent {
    private __nominal! : void;
    
    @Documentation({
        description : "The id of the resolved short URL Equivalence",
        example     : EntityIdExample,
    })
    public shortURLEquivalenceId ! : ShortURLEquivalence["id"];

}
