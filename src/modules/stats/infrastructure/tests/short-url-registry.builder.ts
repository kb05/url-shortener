import {
    Injectable, 
} from "@nestjs/common";
import {
    randNumber,
} from "@ngneat/falso";
import { OmitFunctions, } from "@src/framework/types/type-utils";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { CreateShortURLRegistry, } from "@src/modules/stats/domain/models/create-short-url-registry.model";
import { ShortURLRegistryRepository, } from "@src/modules/stats/domain/repositories/short-url-registry.repository";


export type RequiredURLRegistryFields = Pick<CreateShortURLRegistry, "shortURLEquivalenceId"> & Partial<OmitFunctions<CreateShortURLRegistry>>

@Injectable()
export class ShortURLRegistryBuilder {

    constructor(
        private readonly repository : ShortURLRegistryRepository,
    ) {}
    
    async generate(createShortURLEquivalence : RequiredURLRegistryFields) {
        return this.repository.create(
            await transformAndValidate(CreateShortURLRegistry, {
                numberOfRequests: randNumber({
                    min: 0, 
                }),
                ...createShortURLEquivalence,
            }
            )
        );
    }

}
