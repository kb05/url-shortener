import { Documentation, } from "@src/framework/documentation/documentation";
import {
    ModelIntersectionType, ModelPickType, 
} from "@src/framework/types/mapped-types";
import { AppDate, } from "@src/framework/validators/app-date.decorator";
import { ShortURLRegistry, } from "@src/modules/stats/domain/models/short-url-registry.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


export class ShortURLStats extends ModelIntersectionType(
    ModelPickType(ShortURLEquivalence, ["shortUUID", "url",]),
    ModelPickType(ShortURLRegistry, ["numberOfRequests",])
) {
    private __nominal! : void;
    

    @Documentation({
        description : "The date when the short registry url was last accessed",
        example     : new Date(),
    })
    @AppDate()
    public lastAccess ! : Date;
    
}
