import {
    Controller, Get, Query, 
} from "@nestjs/common";
import { APIController, } from "@src/framework/clean-architecture/adapters/controllers/API-controller.class";
import { DocumentAPIResponse, } from "@src/framework/documentation/document-api-response";
import {
    FindURLStatsUseCase, 
} from "@src/modules/stats/application/use-cases/find-short-url-stats.use-case";
import { ShortURLStatsPaginationOutput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-output.model";
import { ShortURLEquivalencePaginationInput, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence-pagination-input.model";


@Controller("stats")
export class ShortURLStatsController implements APIController<ShortURLStatsController> {

    constructor(
        private readonly findURLStatsUseCase : FindURLStatsUseCase
    ) {
        
    }

    @DocumentAPIResponse({
        response : [ShortURLStatsPaginationOutput,],
        errors   : [],
    })
    @Get()
    async find(
    @Query() shortURLEquivalencePaginationInput : ShortURLEquivalencePaginationInput,
    ) {
        return this.findURLStatsUseCase.perform({
            shortURLEquivalencePaginationInput, 
        });
    }
}
