import { DomainError, } from "@src/framework/clean-architecture/domain/error";


export function isDomainError(error : unknown) : error is DomainError {
    return  error instanceof DomainError;
}
