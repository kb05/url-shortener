import { Model, } from "@src/framework/clean-architecture/domain/model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { IsNotEmptyString, } from "@src/framework/validators/is-not-empty-string-validator";
import { IsValidUrl, } from "@src/framework/validators/is-valid-url.validator";
import { AppStringSize, } from "@src/framework/validators/string-size-validator";


export class CreateShortURLEquivalenceResponse extends Model {
    private __nominal! : void;


    @Documentation({
        description : "The original url",
        example     : "https://www.reactable.ai/",
    })
    @IsNotEmptyString(AppStringSize.MEDIUM)
    @IsValidUrl()
    public url ! : string;

}
