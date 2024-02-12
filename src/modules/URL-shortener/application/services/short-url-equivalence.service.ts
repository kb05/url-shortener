import { Injectable, } from "@nestjs/common";
import { generateCrudService, } from "@src/framework/clean-architecture/application/generate-crud-service";
import { ApplicationLogger, } from "@src/framework/modules/global-resources/logger/logger";
import { UUIDService, } from "@src/framework/modules/uuid/uuid.service";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { DuplicatedShortUUIDError, } from "@src/modules/URL-shortener/domain/errors/duplicated-short-uuid.error";
import { DuplicatedURLError, } from "@src/modules/URL-shortener/domain/errors/duplicated-url.error";
import { ShortUrlEquivalenceNotFoundError, } from "@src/modules/URL-shortener/domain/errors/short-url-equivalence.not-found.error";
import { ShortUUIDURLEquivalenceNotFoundError, } from "@src/modules/URL-shortener/domain/errors/short-uuid-url-equivalence.not-found.error";
import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { ShortURLEquivalenceRepository, } from "@src/modules/URL-shortener/domain/repositories/short-url-equivalence.repository";
import { get, } from "lodash";
import promiseAllProperties from "promise-all-properties";
import retryAsPromised from "retry-as-promised";

export const SHORT_UUID_LENGTH = 10;

@Injectable()
export class ShortUrlEquivalenceService extends generateCrudService({
    modelClass                  : ShortURLEquivalence,
    createModelInformationClass : CreateShortURLEquivalence,
    notFoundError               : ShortUrlEquivalenceNotFoundError,
    onSaveErrors                : [DuplicatedShortUUIDError, DuplicatedURLError,],
}) { 
    
    constructor(
        protected readonly shortURLEquivalenceRepository : ShortURLEquivalenceRepository,
        private readonly uuidService : UUIDService,
        private readonly applicationLogger : ApplicationLogger
    ) {
        super(shortURLEquivalenceRepository);
    }

    protected async verifyModel(model : CreateShortURLEquivalence | ShortURLEquivalence) {
    
        const {
            urlEquivalenceWithTheSameURL,
            urlEquivalenceWithTheSameShortUUID,
        } = await promiseAllProperties({
            urlEquivalenceWithTheSameURL       : this.shortURLEquivalenceRepository.findByURL(model.url),
            urlEquivalenceWithTheSameShortUUID : this.shortURLEquivalenceRepository.findByShortUUID(model.shortUUID),
        });

        if (urlEquivalenceWithTheSameURL && get(model, "id") !== urlEquivalenceWithTheSameURL.id) {
            return transformAndValidate(DuplicatedURLError, {
                url: model.url,
            });
        }

        if (urlEquivalenceWithTheSameShortUUID && get(model, "id") !== urlEquivalenceWithTheSameShortUUID.id) {
            return transformAndValidate(DuplicatedShortUUIDError, {
                shortUUID: model.url,
            });
        }
    }

    public async findByURL(url : ShortURLEquivalence["url"]) : Promise<ShortURLEquivalence|undefined> { 
        return this.shortURLEquivalenceRepository.findByURL(url);
    }

    public async findByShortUUID(shortUUID : ShortURLEquivalence["shortUUID"]) : Promise<ShortURLEquivalence|undefined> { 
        return this.shortURLEquivalenceRepository.findByShortUUID(shortUUID);
    }

    public findByPaginated(params : Parameters<ShortURLEquivalenceRepository["findByPaginated"]>[0]) {
        return this.shortURLEquivalenceRepository.findByPaginated(params);
    }

    public async getByShortUUID(shortUUID : ShortURLEquivalence["shortUUID"]) : Promise<ShortURLEquivalence | ShortUUIDURLEquivalenceNotFoundError> { 
        const shortURLEquivalence = await this.shortURLEquivalenceRepository.findByShortUUID(shortUUID);

        if (!shortURLEquivalence) {
            return transformAndValidate(ShortUUIDURLEquivalenceNotFoundError, {
                shortUUID,
            });
        }

        return shortURLEquivalence;
    }


    public async generateNewShortUUID() : Promise<string>{


        const generatedUUIDs : string[] = [];
        
        // All the algorithms are pseudorandom, also the string space is lower than the url space so we could have
        // repeated codes, the possibility is so reduced but we need to be prepared for that
        const shortURL = await retryAsPromised(async () => {

            const uuid = await this.uuidService.getShortUUID(SHORT_UUID_LENGTH);

            generatedUUIDs.push(uuid);
            
            const shortURLEquivalence = await this.findByShortUUID(uuid);

            if (shortURLEquivalence) {
                return undefined;
            }
            
            return uuid;
        }, {
            max   : 3,
            match : (value : unknown) => !!value,
        });

        if (!shortURL) {
            
            this.applicationLogger.error({
                message: "It was not possible generated the short url",
                generatedUUIDs,
            });

    
            throw new Error("Could not generate short URL");
        }

        return shortURL;
    }

  
}
