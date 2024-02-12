import { CreationModel, } from "@src/framework/types/mapped-types";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


export class CreateShortURLEquivalence extends CreationModel(ShortURLEquivalence) {
    private __nominal! : void;
    
}
