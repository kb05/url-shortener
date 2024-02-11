import { HttpStatus, } from "@nestjs/common";
import { DomainError, } from "@src/framework/clean-architecture/domain/error";
import { ConflictDomainError, } from "@src/framework/clean-architecture/domain/errors/conflict.error";
import { ForbiddenDomainError, } from "@src/framework/clean-architecture/domain/errors/forbidden.error";
import { NotFoundDomainError, } from "@src/framework/clean-architecture/domain/errors/not-found.error";
import { UnauthorizedDomainError, } from "@src/framework/clean-architecture/domain/errors/unauthorized.error";
import { ClassType, } from "@src/framework/types/type-utils";
import { findKey, } from "lodash";


const HttpCodeDomainErrorEquivalence : {
    [key : number] : ClassType<DomainError>[];
} = {
    [HttpStatus.UNAUTHORIZED] : [UnauthorizedDomainError,],
    [HttpStatus.NOT_FOUND]    : [NotFoundDomainError,],
    [HttpStatus.CONFLICT]     : [ConflictDomainError,],
    [HttpStatus.FORBIDDEN]    : [ForbiddenDomainError,],
} as unknown as {[key : number] : ClassType<DomainError>[]};


export function domainErrorToErrorCode(domainError : DomainError) : number {
        
    const httpErrorCode = findKey(
        HttpCodeDomainErrorEquivalence,
        (relatedErrors) => relatedErrors.find(error => domainError instanceof error)
    );
   
    return httpErrorCode ? Number(httpErrorCode) : HttpStatus.INTERNAL_SERVER_ERROR;
}

export function domainErrorConstructorToErrorCode(domainError : ClassType<DomainError>) : number {
        
    const httpErrorCode = findKey(
        HttpCodeDomainErrorEquivalence,
        (relatedErrors) => relatedErrors.find(error => domainError.prototype instanceof error)
    );
   
    return httpErrorCode ? Number(httpErrorCode) : HttpStatus.INTERNAL_SERVER_ERROR;
}
