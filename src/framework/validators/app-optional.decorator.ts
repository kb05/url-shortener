import { applyDecorators, } from "@nestjs/common";
import { ApiProperty, } from "@nestjs/swagger";
import {
    IsOptional,
    ValidationOptions,
} from "class-validator";


/**
 * A decorator that set the provided parameter as optional 
 *
 * @export
 * @param {ParamOptions} [options] The list of options.
 * @return {*}
 */
export function AppOptional(validationOptions ?: ValidationOptions) {
    
    return applyDecorators(
        IsOptional(validationOptions),
        ApiProperty({
            required: false, 
        })
    );
}
