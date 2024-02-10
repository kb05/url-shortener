import { EntityModel, } from "@src/framework/clean-architecture/domain/entity.model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { IsNotEmptyString, } from "@src/framework/validators/is-not-empty-string-validator";
import { AppStringSize, } from "@src/framework/validators/string-size-validator";


export class ShortURLEquivalence extends EntityModel {
    private __nominal! : void;

    @Documentation({
        description : "The original url",
        example     : "https://www.reactable.ai/",
    })
    @IsNotEmptyString(AppStringSize.MEDIUM)
    public url ! : string;
    
    @Documentation({
        description : "The shortened url",
        example     : "https://www.reactable.ai/",
    })
    @IsNotEmptyString(AppStringSize.SHORT)
    public shortURL ! : string;
    
}
