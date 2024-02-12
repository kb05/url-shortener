import { CreationModel, } from "@src/framework/types/mapped-types";
import { ShortURLStats, } from "@src/modules/stats/domain/models/short-url-stats.model";


export class CreateShortURLStats extends CreationModel(ShortURLStats) {
    private __nominal! : void;
    
}
