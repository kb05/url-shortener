import {
    Injectable,
    OnModuleInit,
} from "@nestjs/common";
import { Model, } from "@src/framework/clean-architecture/domain/model";
import { env, } from "@src/framework/environment/env";
import { CacheService, } from "@src/framework/modules/cache/cache.service";
import { ApplicationLogger, } from "@src/framework/modules/global-resources/logger";
import { ClassType, } from "@src/framework/types/type-utils";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import {
    RedisClientType, createClient, 
} from "redis";


@Injectable()
export class RedisCacheService extends CacheService implements OnModuleInit {
   

    private readonly redisClient : RedisClientType;
        
    constructor(
        private readonly applicationLogger : ApplicationLogger
    ) {
        super();
        
        this.redisClient = createClient({
            url: env.redisConnection.getRedisURL(),
        });
    }

    async onModuleInit() {
        await this.redisClient.connect();
    }

    async getModel<T extends Model>({ modelType, cacheKey, } : { modelType : ClassType<T>; cacheKey : string; }) : Promise<T | undefined> {
        
        const rawInformation = await this.redisClient.get(
            this.getModelKey(modelType, cacheKey)
        );

        if (!rawInformation) {
            return undefined;
        }

        const unserializedModel = await this.unserializeModel({
            modelType,
            rawInformation,
        });

        if (!unserializedModel) {
            this.applicationLogger.error({
                error : "It was not possible unserialize the model",
                model : modelType.name,
                rawInformation,
            });
        }


        return unserializedModel;
    }

    
    async saveModel<T extends Model>({ model, cacheKey, } : { model : T; cacheKey : string; }) {
        
        await this.redisClient.set(
            this.getModelKey(model.constructor as ClassType<T>, cacheKey),
            await this.serializeModel(model),
        );

    }

    async removeModel<T extends Model>({ modelType, cacheKey, } : { modelType : ClassType<T>; cacheKey : string; }) {
        
        await this.redisClient.del(
            this.getModelKey(modelType, cacheKey)
        );

    }

    async getOrSet<T extends Model>(
        {
            modelType,
            cacheKey,
            setCallback,
        } : {
            modelType : ClassType<T>;
            cacheKey : string;
            setCallback : () => Promise<T|undefined>;
        }
    ) : Promise<T|undefined> {
        
        const cachedModel = await this.getModel({
            modelType,
            cacheKey,
        });

        if (cachedModel) {
            return cachedModel;
        }

        const newModel = await setCallback();

        if (!newModel) {
            return undefined;
        }

        await this.saveModel({
            cacheKey,
            model: newModel,
        });

        return newModel;
    }


    private getModelKey(modelType : ClassType<Model>, key : string) {
        return `${modelType.name}:${key}`;
    }
    
    private async serializeModel(model : Model) : Promise<string> { 
        return JSON.stringify(model);
    }

    private async unserializeModel<T extends Model>(
        { modelType, rawInformation, } : {
            modelType : ClassType<T>,
            rawInformation : string
        }
    ) : Promise<T | undefined>{ 
        try {
            const jsonObject = JSON.parse(rawInformation);
            
            const result = await transformAndValidate(modelType, jsonObject);

            return result;
        } catch (error) {
            return undefined;
        }
    }

}
