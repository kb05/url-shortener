import {
    Injectable, NestInterceptor, ExecutionContext, CallHandler, 
} from "@nestjs/common";
import {
    get, isObject, 
} from "lodash";
import {
    Observable, map, 
} from "rxjs";


@Injectable()
export class DomainErrorCodeInterceptor implements NestInterceptor {
    intercept(context : ExecutionContext, next : CallHandler) : Observable<any> {
        return next
            .handle()
            .pipe(
                map((responseBody) => {
                    if (isObject(responseBody) && get(responseBody, "errorType")) {
                        context.switchToHttp().getResponse().status(get(responseBody, "code"));
                    }
                    return responseBody;
                }),
            );
    }
}
