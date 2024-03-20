import { ConflictDomainError, } from "@src/framework/clean-architecture/domain/errors/conflict.error";
import { Documentation, } from "@src/framework/documentation/documentation";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { IsString, } from "class-validator";


export class DuplicatedShortUUIDError extends ConflictDomainError {
    private __nominal! : void;
  
    @Documentation({
        description : "The url of the duplicated short url equivalence",
        example     : "https://www.short-url/xyz",
    })
    @IsString()
    public shortUUID! : ShortURLEquivalence["shortUUID"];
    
    
    public describe() : string {
        return `Already exists an short url equivalence with short-uuid: ${this.shortUUID}.`;
    }
}
