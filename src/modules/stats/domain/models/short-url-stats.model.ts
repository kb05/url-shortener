import { EntityModel, } from "@src/framework/clean-architecture/domain/entity.model";
import { Documentation, } from "@src/framework/documentation/documentation";
import {
    EntityIdExample, IsEntityId, 
} from "@src/framework/validators/is-entity-id";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import {
    IsNumber, Min, 
} from "class-validator";


export class ShortURLStats extends EntityModel {
    private __nominal! : void;

    @Documentation({
        description : "The number of requests that short url equivalence has received",
        example     : 10,
    })
    @IsNumber()
    @Min(0)
    public numberOfRequests ! : number;
    
    @Documentation({
        description : "The id of the referenced ShortURLEquivalence entity",
        example     : EntityIdExample,
    })
    @IsEntityId()
    public shortURLEquivalenceId ! : ShortURLEquivalence["id"];
    
}
