import path from "path";
import { Documentation, } from "@src/framework/documentation/documentation";
import { DatabaseConnection, } from "@src/framework/environment/database-connection.class";

import { ValidInstanceOf, } from "@src/framework/validators/valid-instance-of.validator";
import {
    IsNumber, Max, Min, 
} from "class-validator";

const MAX_PORT_NUMBER = 65535;

export class Environment {

    @Documentation({
        description : "The port that will be used to server the app",
        example     : 4000,
    })
    @IsNumber()
    @Min(0)
    @Max(MAX_PORT_NUMBER)
    readonly port! : string;

    @Documentation({
        description: "The information required to connect to the database",
    })
    @ValidInstanceOf(DatabaseConnection)
    readonly databaseConnection ! : DatabaseConnection;
    
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