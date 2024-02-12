import {
    generatePagePaginationOutput,
} from "@src/framework/clean-architecture/domain/types/page-pagination-output.model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { ValidInstanceOf, } from "@src/framework/validators/valid-instance-of.validator";
import { ShortURLStats, } from "@src/modules/stats/domain/models/short-url-stats.model";


export class ShortURLStatsPaginationOutput extends generatePagePaginationOutput(ShortURLStats)
{
    private __nominal! : void;

    @Documentation({
        description: "The list of items filtered",
    })
    @ValidInstanceOf([ShortURLStats,])
    public results ! : ShortURLStats[];
    
}
