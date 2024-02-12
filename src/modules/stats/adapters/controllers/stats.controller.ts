import {
    Controller, Get, Query, 
} from "@nestjs/common";
import { APIController, } from "@src/framework/clean-architecture/adapters/controllers/API-controller.class";
import { DocumentAPIResponse, } from "@src/framework/documentation/document-api-response";
import { ShortURLStatsPaginationInput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-input.model";
import { ShortURLStatsPaginationOutput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-output.model";


@Controller("stats")
export class ShortURLStatsController implements APIController<ShortURLStatsController> {

    @DocumentAPIResponse({
        response : [ShortURLStatsPaginationOutput,],
        errors   : [],
    })
    @Get()
    async find(
    @Query() shortURLStatsPaginationInput : ShortURLStatsPaginationInput,
    ) {
        
        console.log(shortURLStatsPaginationInput);
        
        throw new Error("");
        return null;
    }
}
