import { PagePaginationInput, } from "@src/framework/clean-architecture/domain/types/page-pagination-input.model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { AppOptional, } from "@src/framework/validators/app-optional.decorator";
import { IsEntityId, } from "@src/framework/validators/is-entity-id";
import { ShortURLStats, } from "@src/modules/stats/domain/models/short-url-stats.model";


export class ShortURLStatsPaginationInput extends PagePaginationInput{
    private __nominal! : void;

    @Documentation({
        description: "The list of shortURLEquivalenceIds that will be used to filter the results",
    })
    @IsEntityId({
        each: true, 
    })
    @AppOptional()
    public shortURLEquivalenceIds ?: ShortURLStats["shortURLEquivalenceId"][];

}
