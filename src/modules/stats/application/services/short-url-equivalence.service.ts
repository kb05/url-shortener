import { Injectable, } from "@nestjs/common";
import { generateCrudService, } from "@src/framework/clean-architecture/application/generate-crud-service";
import { isDomainError, } from "@src/framework/clean-architecture/domain/errors/is-domain-error";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { DuplicatedShortURLStatsError, } from "@src/modules/stats/domain/errors/duplicated-short-url-stats.error";
import { ShortURLStatsNotFoundError, } from "@src/modules/stats/domain/errors/short-url-stats.not-found.error";
import { CreateShortURLStats, } from "@src/modules/stats/domain/models/create-short-url-stats.model";
import { ShortURLStats, } from "@src/modules/stats/domain/models/short-url-stats.model";
import { ShortURLStatsRepository, } from "@src/modules/stats/domain/repositories/short-url-stats.repository";
import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import { ShortUrlEquivalenceNotFoundError, } from "@src/modules/URL-shortener/domain/errors/short-url-equivalence.not-found.error";
import { get, } from "lodash";
import promiseAllProperties from "promise-all-properties";


@Injectable()
export class ShortURLStatsService extends generateCrudService({
    modelClass                  : ShortURLStats,
    createModelInformationClass : CreateShortURLStats,
    notFoundError               : ShortURLStatsNotFoundError,
    onSaveErrors                : [ShortUrlEquivalenceNotFoundError, DuplicatedShortURLStatsError,],
}) { 
    
    constructor(
        protected readonly shortURLStatsRepository : ShortURLStatsRepository,
        private readonly  shortUrlEquivalenceService : ShortUrlEquivalenceService
    ) {
        super(shortURLStatsRepository);
    }

    protected async verifyModel(model : CreateShortURLStats | ShortURLStats) {
    
        const {
            shortURLEquivalence,
            statsThatReferencesToTheSameShortURLEquivalence,
        } = await promiseAllProperties({
            shortURLEquivalence                             : this.shortUrlEquivalenceService.getById(model.shortURLEquivalenceId),
            statsThatReferencesToTheSameShortURLEquivalence : this.shortURLStatsRepository.findByShortURLEquivalenceId(model.shortURLEquivalenceId),
        });

        if (statsThatReferencesToTheSameShortURLEquivalence && get(model, "id") !== statsThatReferencesToTheSameShortURLEquivalence.id) {
            return transformAndValidate(DuplicatedShortURLStatsError, {
                shortURLEquivalenceId: model.shortURLEquivalenceId,
            });
        }

        if (isDomainError(shortURLEquivalence)) {
            return shortURLEquivalence;
        }
       
    }

}
