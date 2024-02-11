import { Model, } from "@src/framework/clean-architecture/domain/model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { AppDate, } from "@src/framework/validators/app-date.decorator";
import {
    EntityIdExample, IsEntityId, 
} from "@src/framework/validators/is-entity-id";


export class EntityModel extends Model{

    @Documentation({
        description : "The id of the entity",
        example     : EntityIdExample,
    })
    @IsEntityId()
    public id ! : number;
    
    @Documentation({
        description : "The creation date",
        example     : new Date(),
    })
    @AppDate()
    public createdAt ! : Date;
    
    @Documentation({
        description : "The date when the object was updated by the last time",
        example     : new Date(),
    })
    @AppDate()
    public updatedAt ! : Date;
    
}
