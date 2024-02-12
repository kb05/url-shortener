
import { domainErrorToErrorCode, } from "@src/framework/clean-architecture/adapters/controllers/domain-error-to.error.code";
import {
    DTO,
} from "@src/framework/clean-architecture/adapters/controllers/dto";
import { ErrorDTO, } from "@src/framework/clean-architecture/adapters/controllers/error-dto";
import { DomainError, } from "@src/framework/clean-architecture/domain/error";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { omit, } from "lodash";


export async function domainErrorToDto(domainError : DomainError) : Promise<DTO> {
        
    const dto = await transformAndValidate(ErrorDTO, {
        code      : domainErrorToErrorCode(domainError),
        errorType : domainError.constructor.name,
    });

    Object.assign(dto, {
        ...omit(domainError, "getType"),
        description: domainError.describe(),
    });
    
    return dto;
}
