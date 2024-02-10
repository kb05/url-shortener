import { Documentation, } from "@src/framework/documentation/documentation";
import {
    IsNumber, IsString, 
} from "class-validator";


export class DatabaseConnection {

    @Documentation({
        description : "The host of the database",
        example     : "localhost",
    })
    @IsString()
    readonly host ! : string;

    @Documentation({
        description : "The database user",
        example     : "db-user",
    })
    @IsString()
    readonly user ! : string;

    @Documentation({
        description : "The database password",
        example     : "db-password",
    })
    @IsString()
    readonly password ! : string;

    @Documentation({
        description : "The database name",
        example     : "db-name",
    })
    @IsString()
    readonly database ! : string;
    
    @Documentation({
        description : "The database port",
        example     : 5432,
    })
    @IsNumber()
    readonly port ! : number;
    
    public getDatabaseUrl() : string{
        const databaseURL = `postgresql://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`;

        return databaseURL;
    }
}
