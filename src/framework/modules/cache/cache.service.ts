import { Model, } from "@src/framework/clean-architecture/domain/model";
import { ClassType, } from "@src/framework/types/type-utils";


export abstract class CacheService {

    abstract getModel<T extends Model>(params : { modelType : ClassType<T>; cacheKey : string; }) : Promise<T | undefined> 

    abstract saveModel<T extends Model>({ model, cacheKey, } : { model : T; cacheKey : string; }) : Promise<void>

    abstract removeModel<T extends Model>(params : { modelType : ClassType<T>; cacheKey : string; }) : Promise<void> 

    abstract getOrSet<T extends Model>(
        params : {
            modelType : ClassType<T>;
            cacheKey : string;
            setCallback : () => Promise<T|undefined>;
        }
    ) : Promise<T | undefined> 
    
    abstract reset() : Promise<void>

}
