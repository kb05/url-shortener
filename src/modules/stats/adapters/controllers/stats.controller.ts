import {
    Controller, Get, Query, 
} from "@nestjs/common";
import { APIController, } from "@src/framework/clean-architecture/adapters/controllers/API-controller.class";
import { DocumentAPIResponse, } from "@src/framework/documentation/document-api-response";
import {
    FindURLStatsUseCase, 
} from "@src/modules/stats/application/use-cases/find-short-url-registry.use-case";
import { ShortURLRegistryPaginationOutput, } from "@src/modules/stats/domain/models/short-url-registry-pagination-output.model";
import { ShortURLStatsPaginationInput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-input.model";


@Controller("stats")
export class URLRegistryController implements APIController<URLRegistryController> {

    constructor(
        private readonly findURLStatsUseCase : FindURLStatsUseCase
    ) {
        
    }

    @DocumentAPIResponse({
        response : [ShortURLRegistryPaginationOutput,],
        errors   : [],
    })
    @Get()
    async find(
    @Query()  shortURLStatsPaginationInput : ShortURLStatsPaginationInput,
    ) {
        return this.findURLStatsUseCase.perform({
            shortURLStatsPaginationInput, 
        });
    }
}
