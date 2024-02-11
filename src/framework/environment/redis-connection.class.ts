import { Documentation, } from "@src/framework/documentation/documentation";
import {
    IsNumber,
    IsString, 
} from "class-validator";


export class RedisConnection {

    @Documentation({
        description : "The redis user",
        example     : "db-user",
    })
    @IsString()
    readonly user ! : string;
    
    
    @Documentation({
        description : "The host of the redis server",
        example     : "redis",
    })
    @IsString()
    readonly host ! : string;
    
    @Documentation({
        description : "The redis port",
        example     : 5432,
    })
    @IsNumber()
    readonly port ! : number;

    @Documentation({
        description : "The redis password",
        example     : "redis-password",
    })
    @IsString()
    readonly password ! : string;


    public getRedisURL() : string{
        const databaseURL = `redis://${this.user}:${this.password}@${this.host}:${this.port}`;

        return databaseURL;
    }
}
