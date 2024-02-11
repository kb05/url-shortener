import { Injectable, } from "@nestjs/common";
import { generateCrudService, } from "@src/framework/clean-architecture/application/generate-crud-service";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortUrlEquivalenceNotFoundError, } from "@src/modules/URL-shortener/domain/errors/admin.not-found.error";
import { DuplicatedShortURLError, } from "@src/modules/URL-shortener/domain/errors/duplicated-short-url.error";
import { DuplicatedURLError, } from "@src/modules/URL-shortener/domain/errors/duplicated-url.error";
import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { ShortURLEquivalenceRepository, } from "@src/modules/URL-shortener/domain/repositories/short-url-equivalence.repository";
import { get, } from "lodash";
import promiseAllProperties from "promise-all-properties";


@Injectable()
export class ShortUrlEquivalenceService extends generateCrudService({
    modelClass                  : ShortURLEquivalence,
    createModelInformationClass : CreateShortURLEquivalence,
    notFoundError               : ShortUrlEquivalenceNotFoundError,
    onSaveErrors                : [DuplicatedShortURLError, DuplicatedURLError,],
}) { 
    
    constructor(
        protected readonly shortURLEquivalenceRepository : ShortURLEquivalenceRepository,
    ) {
        super(shortURLEquivalenceRepository);
    }

    protected async verifyModel(model : CreateShortURLEquivalence | ShortURLEquivalence) {
    
        const {
            urlEquivalenceWithTheSameURL,
            urlEquivalenceWithTheSameShortUUID,
        } = await promiseAllProperties({
            urlEquivalenceWithTheSameURL       : this.shortURLEquivalenceRepository.findByURL(model.url),
            urlEquivalenceWithTheSameShortUUID : this.shortURLEquivalenceRepository.findByShortURl(model.shortUUID),
        });

        if (urlEquivalenceWithTheSameURL && get(model, "id") !== urlEquivalenceWithTheSameURL.id) {
            return transformAndValidate(DuplicatedURLError, {
                url: model.url,
            });
        }

        if (urlEquivalenceWithTheSameShortUUID && get(model, "id") !== urlEquivalenceWithTheSameShortUUID.id) {
            return transformAndValidate(DuplicatedShortURLError, {
                shortUUID: model.url,
            });
        }
    }
  
}
