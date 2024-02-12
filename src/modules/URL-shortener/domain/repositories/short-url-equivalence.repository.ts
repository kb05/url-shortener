import {
    generateAbstractCRUDRepository, 
} from "@src/framework/clean-architecture/domain/crud-repository";
import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { ShortURLEquivalencePaginationInput, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence-pagination-input.model";
import { ShortURLEquivalencePaginationOutput, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence-pagination-output.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


export abstract class ShortURLEquivalenceRepository extends generateAbstractCRUDRepository(ShortURLEquivalence, CreateShortURLEquivalence) {
 
    abstract findByURL(url : string) : Promise<ShortURLEquivalence | undefined>
    
    abstract findByShortUUID(shortUUID : string) : Promise<ShortURLEquivalence | undefined>
    
    abstract findByPaginated(shortURLEquivalencePaginationInput : ShortURLEquivalencePaginationInput) : Promise<ShortURLEquivalencePaginationOutput>

}
