import {
    generatePagePaginationOutput,
} from "@src/framework/clean-architecture/domain/types/page-pagination-output.model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { ValidInstanceOf, } from "@src/framework/validators/valid-instance-of.validator";

import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


export class ShortURLEquivalencePaginationOutput extends generatePagePaginationOutput(ShortURLEquivalence)
{
    private __nominal! : void;

    @Documentation({
        description: "The list of items filtered",
    })
    @ValidInstanceOf([ShortURLEquivalence,])
    public results ! : ShortURLEquivalence[];
    
}
