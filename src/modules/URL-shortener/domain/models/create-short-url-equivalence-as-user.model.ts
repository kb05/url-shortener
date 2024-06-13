import { Model, } from "@src/framework/clean-architecture/domain/model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { AppOptional, } from "@src/framework/validators/app-optional.decorator";
import { IsNotEmptyString, } from "@src/framework/validators/is-not-empty-string-validator";
import { IsValidUrl, } from "@src/framework/validators/is-valid-url.validator";
import { AppStringSize, } from "@src/framework/validators/string-size-validator";
import { IsValidShortCode, } from "@src/modules/URL-shortener/domain/validations/is-valid-short-code";


export class CreateShortURLEquivalenceAsUser extends Model {
    private __nominal! : void;


    @Documentation({
        description : "The original url",
        example     : "https://stackoverflow.com/",
    })
    @IsNotEmptyString(AppStringSize.MEDIUM)
    @IsValidUrl()
    public full ! : string;
    
    @Documentation({
        description : "The shortened url",
        example     : "o4X1aXzRDy",
    })
    @IsValidShortCode()
    @AppOptional()
    public short ?: string;
    
}
