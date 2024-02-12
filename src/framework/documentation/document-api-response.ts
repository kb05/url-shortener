/* eslint-disable @typescript-eslint/ban-types */

import {
    ApiResponse, 
} from "@nestjs/swagger";
import { domainErrorConstructorToErrorCode, } from "@src/framework/clean-architecture/adapters/controllers/domain-error-to.error.code";

import { ErrorDTO, } from "@src/framework/clean-architecture/adapters/controllers/error-dto";
import { DomainError, } from "@src/framework/clean-architecture/domain/error";
import { Model, } from "@src/framework/clean-architecture/domain/model";
import { applyDecorators, } from "@src/framework/decorators/apply-decorators";
import { Documentation, } from "@src/framework/documentation/documentation";
import { ModelIntersectionType, } from "@src/framework/types/mapped-types";
import { ClassType, } from "@src/framework/types/type-utils";
import {
    IsNumber, IsString, isArray, 
} from "class-validator";
import { Dictionary, } from "lodash";


function generateErrorClassType({ 
    errorConstructor,
    errorCode,
} : {
    errorConstructor : ClassType<DomainError>,
    errorCode : number
}) {
   
    class errorClassType extends ErrorDTO {

        @Documentation({
            description : "The error type",
            example     : errorConstructor.name,
        })
        @IsString()
        public errorType ! : string;
        
        @Documentation({
            description : "A description about the error",
            example     : "A description about the error",
        })
        @IsString()
        public description ! : string;
      
        @Documentation({
            description : "The error code",
            example     : errorCode,
        })
        @IsNumber()
        public code ! : number;
        
    };
  
    return errorClassType;
}

export function DocumentAPIResponse({
    response,
    errors,
} : {
    response : (ClassType<Model>)[],
    errors : (ClassType<DomainError>)[],
}) : Function {

    const responseConstructors = isArray(response) ? response : [response,];
    const errorConstructors = isArray(errors) ? errors : [errors,];

    const errorCodeIndexDictionary : Dictionary<number> = {};
    
    
    function getNextErrorIdentifier(errorCode : number) {

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const currentIndex = errorCodeIndexDictionary[errorCode] ?? 0;

        const nextIndex = currentIndex + 1;

        errorCodeIndexDictionary[errorCode] = nextIndex;

        if (nextIndex === 1) {
            return `${errorCode} `;

        }

        return `${errorCode} .${nextIndex}`;

    }


    const responseDecorators : (ClassDecorator)[] = responseConstructors.map(
        responseConstructor => ApiResponse({
            type   : responseConstructor, 
            status : 0,
        }),
    );

    const aux = 1;

    const errorDecorators : (ClassDecorator)[] = errorConstructors.map(responseConstructor => {

        const domainErrorConstructor = responseConstructor as ClassType<DomainError>;

      
        const errorCode = domainErrorConstructorToErrorCode(domainErrorConstructor);

        const errorWithExtraFields = generateErrorClassType({
            errorCode,
            errorConstructor: domainErrorConstructor,
        });
      
        const errorResponseConstructor = ModelIntersectionType(domainErrorConstructor, errorWithExtraFields);
        Object.defineProperty(
            errorResponseConstructor,
            "name",
            {
                value: domainErrorConstructor.name + "DTO", 
            }
        );

        console.log(errorResponseConstructor.name);
        return ApiResponse(
            {
                type   : errorResponseConstructor,
                status : getNextErrorIdentifier(errorCode) as unknown as number,
            },
        );

    });

    return applyDecorators(...responseDecorators, ...errorDecorators);
}
