import {
    Injectable, 
} from "@nestjs/common";
import {
    randNumber,
} from "@ngneat/falso";

import { OmitFunctions, } from "@src/framework/types/type-utils";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { CreateShortURLStats, } from "@src/modules/stats/domain/models/create-short-url-stats.model";
import {
    ShortURLStatsRepository,
} from "@src/modules/stats/domain/repositories/short-url-stats.repository";


export type RequiredShortURLStatsFields = Pick<CreateShortURLStats, "shortURLEquivalenceId"> & Partial<OmitFunctions<CreateShortURLStats>>

@Injectable()
export class ShortURLStatsBuilder {

    constructor(
        private readonly shortURLEquivalenceRepository : ShortURLStatsRepository,
    ) {}
    
    async generate(createShortURLEquivalence : RequiredShortURLStatsFields) {
        return this.shortURLEquivalenceRepository.create(
            await transformAndValidate(CreateShortURLStats, {
                numberOfRequests: randNumber({
                    min: 0, 
                }),
                ...createShortURLEquivalence,
            }
            )
        );
    }

}
