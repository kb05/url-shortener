import { ConflictDomainError, } from "@src/framework/clean-architecture/domain/errors/conflict.error";
import { Documentation, } from "@src/framework/documentation/documentation";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { IsString, } from "class-validator";


export class DuplicatedURLError extends ConflictDomainError {
    private __nominal! : void;

    @Documentation({
        description : "The url of the duplicated url equivalence",
        example     : "rick-sanchez@talent-match.com",
    })
    @IsString()
    public url ! : ShortURLEquivalence["url"];
    
    
    public describe() : string {
        return `Already exists an short url equivalence with url: ${this.url}.`;
    }
}
