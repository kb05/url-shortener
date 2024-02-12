import {
    generatePagePaginationOutput,
} from "@src/framework/clean-architecture/domain/types/page-pagination-output.model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { ValidInstanceOf, } from "@src/framework/validators/valid-instance-of.validator";
import { ShortURLRegistry, } from "@src/modules/stats/domain/models/short-url-registry.model";


export class ShortURLRegistryPaginationOutput extends generatePagePaginationOutput(ShortURLRegistry)
{
    private __nominal! : void;

    @Documentation({
        description: "The list of items filtered",
    })
    @ValidInstanceOf([ShortURLRegistry,])
    public results ! : ShortURLRegistry[];

}
