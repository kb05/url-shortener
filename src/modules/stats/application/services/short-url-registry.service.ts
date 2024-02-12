import { Injectable, } from "@nestjs/common";
import { generateCrudService, } from "@src/framework/clean-architecture/application/generate-crud-service";
import { isDomainError, } from "@src/framework/clean-architecture/domain/errors/is-domain-error";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { DuplicatedShortURLRegistryError, } from "@src/modules/stats/domain/errors/duplicated-short-url-registry.error";
import {
    ShortURLRegistryOfShortURLEquivalenceNotFoundError,
} from "@src/modules/stats/domain/errors/short-url-registry-of-short-url-equivalence.not-found.error";
import { ShortURLRegistryNotFoundError, } from "@src/modules/stats/domain/errors/short-url-registry.not-found.error";
import { CreateShortURLRegistry, } from "@src/modules/stats/domain/models/create-short-url-registry.model";
import { ShortURLRegistry, } from "@src/modules/stats/domain/models/short-url-registry.model";
import {
    ShortURLRegistryRepository,
} from "@src/modules/stats/domain/repositories/short-url-registry.repository";
import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import { ShortUrlEquivalenceNotFoundError, } from "@src/modules/URL-shortener/domain/errors/short-url-equivalence.not-found.error";
import { get, } from "lodash";
import promiseAllProperties from "promise-all-properties";


@Injectable()
export class ShortURLRegistryService extends generateCrudService({
    modelClass                  : ShortURLRegistry,
    createModelInformationClass : CreateShortURLRegistry,
    notFoundError               : ShortURLRegistryNotFoundError,
    onSaveErrors                : [ShortUrlEquivalenceNotFoundError, DuplicatedShortURLRegistryError,],
}) { 
    
    constructor(
        protected readonly URLRegistryRepository : ShortURLRegistryRepository,
        private readonly  shortUrlEquivalenceService : ShortUrlEquivalenceService
    ) {
        super(URLRegistryRepository);
    }

    protected async verifyModel(model : CreateShortURLRegistry | ShortURLRegistry) {
    
        const {
            shortURLEquivalence,
            statsThatReferencesToTheSameShortURLEquivalence,
        } = await promiseAllProperties({
            shortURLEquivalence                             : this.shortUrlEquivalenceService.getById(model.shortURLEquivalenceId),
            statsThatReferencesToTheSameShortURLEquivalence : this.URLRegistryRepository.findByShortURLEquivalenceId(model.shortURLEquivalenceId),
        });

        if (statsThatReferencesToTheSameShortURLEquivalence && get(model, "id") !== statsThatReferencesToTheSameShortURLEquivalence.id) {
            return transformAndValidate(DuplicatedShortURLRegistryError, {
                shortURLEquivalenceId: model.shortURLEquivalenceId,
            });
        }

        if (isDomainError(shortURLEquivalence)) {
            return shortURLEquivalence;
        }
       
    }

    public async getByShortURLEquivalenceId(
        shortURLEquivalenceId : ShortURLRegistry["shortURLEquivalenceId"]
    ) : Promise<ShortURLRegistry | ShortURLRegistryOfShortURLEquivalenceNotFoundError> { 
        const URLRegistry = await this.URLRegistryRepository.findByShortURLEquivalenceId(shortURLEquivalenceId);

        if (!URLRegistry) {
            return transformAndValidate(ShortURLRegistryOfShortURLEquivalenceNotFoundError, {
                shortURLEquivalenceId,
            });
        }

        return URLRegistry;
    }

    public findByPaginated(params : Parameters<ShortURLRegistryRepository["findByPaginated"]>[0]) {
        return this.URLRegistryRepository.findByPaginated(params);
    }


}
