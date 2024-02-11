import { Model, } from "@src/framework/clean-architecture/domain/model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { IsNotEmptyString, } from "@src/framework/validators/is-not-empty-string-validator";
import { IsValidUrl, } from "@src/framework/validators/is-valid-url.validator";
import { AppStringSize, } from "@src/framework/validators/string-size-validator";
import { IsValidShortCode, } from "@src/modules/URL-shortener/domain/validations/is-valid-short-code";
import { IsOptional, } from "class-validator";


export class CreateShortURLEquivalenceAsUser extends Model {
    private __nominal! : void;


    @Documentation({
        description : "The original url",
        example     : "https://www.reactable.ai/",
    })
    @IsNotEmptyString(AppStringSize.MEDIUM)
    @IsValidUrl()
    public full ! : string;
    
    @Documentation({
        description : "The shortened url",
        example     : "https://www.reactable.ai/",
    })
    @IsValidShortCode()
    @IsOptional()
    public short ?: string;
    
    
}
