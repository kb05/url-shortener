import {
    ModelIntersectionType,
    ModelPartialType,
    ModelPickType, 
} from "@src/framework/types/mapped-types";
import {
    CreateShortURLEquivalence,
} from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";

export class CreateShortURLEquivalenceAsUser extends ModelIntersectionType(
    ModelPickType(CreateShortURLEquivalence, ["url",]),
    ModelPartialType(ModelPickType(CreateShortURLEquivalence, ["shortURL",]))
) {
    private __nominal! : void;

    
}
