import { Injectable, } from "@nestjs/common";
import {
    ApplicationLogger, Log, LogInformation, 
} from "@src/framework/modules/global-resources/logger/logger";

import { v4 as uuidv4, } from "uuid";


@Injectable()
export class ApplicationConsoleLogger extends ApplicationLogger {

    private generateLog(message : LogInformation) : Log { 
        return {
            UUID      : uuidv4(),
            message,
            createdAt : new Date(),
        };
    }

    error(message : LogInformation) : Log {
     
        const log = this.generateLog(message);

        console.log(`\n error: ${JSON.stringify(log, null, 2)} \n`);
        
        return log;
    }

    warn(message : LogInformation) : Log {
        const log = this.generateLog(message);

        console.log(`\n warning: ${JSON.stringify(log, null, 2)} \n`);

        return log;
    }

    info(message : LogInformation) : Log {
        const log = this.generateLog(message);

        console.log(`\n info: ${JSON.stringify(log, null, 2)} \n`);

        return log;
    }

}
