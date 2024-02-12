import { EntityModel, } from "@src/framework/clean-architecture/domain/entity.model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { AppNumber, } from "@src/framework/validators/app-number.decorator";
import {
    EntityIdExample, IsEntityId, 
} from "@src/framework/validators/is-entity-id";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


export class ShortURLStats extends EntityModel {
    private __nominal! : void;

    @Documentation({
        description : "The number of requests that short url equivalence has received",
        example     : 10,
    })
    @AppNumber({
        min: 0, 
    })
    public numberOfRequests ! : number;
    
    @Documentation({
        description : "The id of the referenced ShortURLEquivalence entity",
        example     : EntityIdExample,
    })
    @IsEntityId()
    public shortURLEquivalenceId ! : ShortURLEquivalence["id"];
    
}
