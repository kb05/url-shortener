import { CreationModel, } from "@src/framework/types/mapped-types";
import { ShortURLRegistry, } from "@src/modules/stats/domain/models/short-url-registry.model";


export class CreateShortURLRegistry extends CreationModel(ShortURLRegistry) {
    private __nominal! : void;
    
}
