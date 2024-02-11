

import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost, } from "@nestjs/core";
import { ApplicationLogger, } from "@src/framework/modules/global-resources/logger";
import {
    get, 
} from "lodash";

  
@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    
    constructor(
        private readonly httpAdapterHost : HttpAdapterHost,
        private readonly applicationLogger : ApplicationLogger
    ) { }
  
    catch(exception : unknown, host : ArgumentsHost) : void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter, } = this.httpAdapterHost;
  
        const ctx = host.switchToHttp();
  
        const httpStatus =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        
        if (httpStatus === 400) {
            httpAdapter.reply(ctx.getResponse(), get(exception, "response"), httpStatus);
            return;
        }
  
        const responseBody = {
            statusCode : httpStatus,
            timestamp  : new Date().toISOString(),
            path       : httpAdapter.getRequestUrl(ctx.getRequest()),
        };
  
        const log = this.applicationLogger.error({
            context : "ExceptionsFilter",
            message : exception,
        });        
        
        httpAdapter.reply(ctx.getResponse(), {
            logUUID: log.UUID,
            ...responseBody,
        }, httpStatus);
    }
}
