import { EntityIdNotFoundError, } from "@src/framework/clean-architecture/domain/errors/entity-not-found.error";
import { Documentation, } from "@src/framework/documentation/documentation";
import {
    EntityIdExample, IsEntityId, 
} from "@src/framework/validators/is-entity-id";
import { ShortURLRegistry, } from "@src/modules/stats/domain/models/short-url-registry.model";


export class ShortURLRegistryNotFoundError extends EntityIdNotFoundError {
    private __nominal! : void;

    @Documentation({
        description : "The id of the not found short url stats",
        example     : EntityIdExample,        
    })
    @IsEntityId()
    public id ! : ShortURLRegistry["id"];
    
    
    public describe() : string {
        return `The short URL stats with the id ${this.id} was not found.`;
    }
    
}
