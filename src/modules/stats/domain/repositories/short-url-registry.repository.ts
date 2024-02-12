import {
    generateAbstractCRUDRepository, 
} from "@src/framework/clean-architecture/domain/crud-repository";
import { CreateShortURLRegistry, } from "@src/modules/stats/domain/models/create-short-url-registry.model";
import { ShortURLRegistryPaginationInput, } from "@src/modules/stats/domain/models/short-url-registry-pagination-input.model";
import { ShortURLRegistryPaginationOutput, } from "@src/modules/stats/domain/models/short-url-registry-pagination-output.model";
import { ShortURLRegistry, } from "@src/modules/stats/domain/models/short-url-registry.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


export abstract class ShortURLRegistryRepository extends generateAbstractCRUDRepository(ShortURLRegistry, CreateShortURLRegistry) {
 
    abstract findByShortURLEquivalenceId(shortURLEquivalenceId : ShortURLEquivalence["id"]) : Promise<ShortURLRegistry | undefined>
    
    abstract findByPaginated(URLRegistryPaginationInput : ShortURLRegistryPaginationInput) : Promise<ShortURLRegistryPaginationOutput>

}
