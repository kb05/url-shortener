import { PagePaginationInput, } from "@src/framework/clean-architecture/domain/types/page-pagination-input.model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { AppOptional, } from "@src/framework/validators/app-optional.decorator";
import { IsNotEmptyString, } from "@src/framework/validators/is-not-empty-string-validator";


export class ShortURLStatsPaginationInput extends PagePaginationInput{
    private __nominal! : void;

    @Documentation({
        description : "The value that will be use to filter by the url",
        example     : undefined,
    })
    @Documentation({
        required: false,
    })
    @IsNotEmptyString()
    @AppOptional()
    public url ?: string;
    
    @Documentation({
        description : "The value that will be use to filter by the short uuid",
        example     : undefined,
    })
    @IsNotEmptyString()
    @AppOptional()
    public shortUUID ?: string;

}
