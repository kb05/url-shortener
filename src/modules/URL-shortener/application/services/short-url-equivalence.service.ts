import { Injectable, } from "@nestjs/common";
import { generateCrudService, } from "@src/framework/clean-architecture/application/generate-crud-service";
import { ApplicationLogger, } from "@src/framework/modules/global-resources/logger";
import { UUIDService, } from "@src/framework/modules/uuid/uuid.service";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortUrlEquivalenceNotFoundError, } from "@src/modules/URL-shortener/domain/errors/admin.not-found.error";
import { DuplicatedShortURLError, } from "@src/modules/URL-shortener/domain/errors/duplicated-short-url.error";
import { DuplicatedURLError, } from "@src/modules/URL-shortener/domain/errors/duplicated-url.error";
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
    onSaveErrors                : [DuplicatedShortURLError, DuplicatedURLError,],
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
            return transformAndValidate(DuplicatedShortURLError, {
                shortUUID: model.url,
            });
        }
    }

    public async findByURL(url : string) : Promise<ShortURLEquivalence|undefined> { 
        return this.shortURLEquivalenceRepository.findByURL(url);
    }

    public async findByShortUUID(shortUUID : string) : Promise<ShortURLEquivalence|undefined> { 
        return this.shortURLEquivalenceRepository.findByShortUUID(shortUUID);
    }


    public async generateNewShortedUUID() : Promise<string>{


        const generatedUUIDs : string[] = [];
        
        // All the algorithms are pseudorandom, also the string space is lower than the url space so we could have
        // repeated codes, the possibility is so reduced but we need to be prepared for that
        const shortedURL = await retryAsPromised(async () => {

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

        if (!shortedURL) {
            
            this.applicationLogger.error({
                message: "It was not possible generated the shorted url",
                generatedUUIDs,
            });

    
            throw new Error("Could not generate shorted URL");
        }

        return shortedURL;
    }

  
}
