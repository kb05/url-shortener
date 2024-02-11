import {
    Injectable, NestInterceptor, ExecutionContext, CallHandler, 
} from "@nestjs/common";
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
                    if (responseBody["errorType"]) {
                        context.switchToHttp().getResponse().status(responseBody?.code);
                    }
                    return responseBody;
                }),
            );
    }
}
