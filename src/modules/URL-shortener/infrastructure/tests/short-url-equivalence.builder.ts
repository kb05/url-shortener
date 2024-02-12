import {
    Injectable, 
} from "@nestjs/common";
import {
    randUrl,
} from "@ngneat/falso";
import { UUIDService, } from "@src/framework/modules/uuid/uuid.service";
import { OmitFunctions, } from "@src/framework/types/type-utils";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { ShortURLEquivalenceRepository, } from "@src/modules/URL-shortener/domain/repositories/short-url-equivalence.repository";


@Injectable()
export class ShortURLEquivalenceBuilder {

    constructor(
        private readonly repository : ShortURLEquivalenceRepository,
        private readonly uuidService : UUIDService
    ) {
    }
    
    async generate(createShortURLEquivalence : Partial<OmitFunctions<CreateShortURLEquivalence>> = {}) {
        return this.repository.create(
            await transformAndValidate(CreateShortURLEquivalence, {
                shortUUID : await this.uuidService.getShortUUID(10),
                url       : randUrl(),
                ...createShortURLEquivalence,
            }
            )
        );
    }

}
