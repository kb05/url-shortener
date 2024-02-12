import { Injectable, } from "@nestjs/common";
import {
    ApplicationLogger, Log, LogInformation, 
} from "@src/framework/modules/global-resources/logger/logger";
import { v4 as uuidv4, } from "uuid";


@Injectable()
export class ApplicationNoLogger extends ApplicationLogger {

    private generateLog(message : LogInformation) : Log { 
        return {
            UUID      : uuidv4(),
            message,
            createdAt : new Date(),
        };
    }

    error(message : LogInformation) : Log {
     
        const log = this.generateLog(message);
        
        return log;
    }

    warn(message : LogInformation) : Log {
        const log = this.generateLog(message);

        return log;
    }

    info(message : LogInformation) : Log {
        const log = this.generateLog(message);

        return log;
    }

}
