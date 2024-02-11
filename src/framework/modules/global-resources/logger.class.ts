import { Dictionary, } from "lodash";

export type LogInformation = string | Dictionary<unknown>

export type Log = {
    uuid : string,
    message : LogInformation,
    createdAt : Date,
}

export abstract class ApplicationLogger {
    abstract error(message : LogInformation) : Log;

    abstract warn(message : LogInformation) : Log;

    abstract info(message : LogInformation) : Log;
}
