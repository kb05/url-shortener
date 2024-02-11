import {
    generateAbstractCRUDRepository, 
} from "@src/framework/clean-architecture/domain/crud-repository";
import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


export abstract class ShortURLEquivalenceRepository extends generateAbstractCRUDRepository(ShortURLEquivalence, CreateShortURLEquivalence) {
 
}
