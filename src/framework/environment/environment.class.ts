import path from "path";
import { Documentation, } from "@src/framework/documentation/documentation";
import { DatabaseConnection, } from "@src/framework/environment/database-connection.class";
import { RedisConnection, } from "@src/framework/environment/redis-connection.class";
import { AppNumber, } from "@src/framework/validators/app-number.decorator";
import { IsNotEmptyString, } from "@src/framework/validators/is-not-empty-string-validator";
import { ValidInstanceOf, } from "@src/framework/validators/valid-instance-of.validator";


const MAX_PORT_NUMBER = 65535;

export class Environment {

    @Documentation({
        description : "The port that will be used to server the app",
        example     : 4000,
    })
    @AppNumber({
        min : 0, 
        max : MAX_PORT_NUMBER,
    })
    readonly port! : number;
    
    @Documentation({
        description : "The domain in which will be served the application",
        example     : "http://localhost:3000",
    })
    @IsNotEmptyString()
    readonly applicationDomain ! : string;
    

    @Documentation({
        description: "The information required to connect to the database",
    })
    @ValidInstanceOf(DatabaseConnection)
    readonly databaseConnection ! : DatabaseConnection;
    
    @Documentation({
        description: "The information required to connect to the redis server",
    })
    @ValidInstanceOf(RedisConnection)
    readonly redisConnection ! : RedisConnection;
    
    
    getProjectPath(subPathValue ?: string) : string { 
        
        const basePath = "../../..";

        const subPath = subPathValue ? `/${subPathValue}` : undefined;

        const paths = [__dirname, basePath, subPath,].filter(path => path) as string[];
        
        return path.join(...paths);
    }

    isProduction() : boolean { 
        return !this.isTestEnvironment();
    }

    isTestEnvironment() : boolean { 
        return process.env.NODE_ENV === "test";
    }
    
}
