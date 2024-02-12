import { applyDecorators, } from "@nestjs/common";
import {
    Type, 
} from "class-transformer";
import {
    
    
    IsNumber, Max, Min, ValidationOptions,
} from "class-validator";


/**
 * A decorator that validates if the provided value is a integer
 * If the object is not a date but it a string number the transform method will transform the string into a number
 *
 * @export
 * @param {ParamOptions} [options] The list of options.
 * @return {*}
 */
export function AppNumber(validationOptions ?: ValidationOptions & {
    min ?: number,
    max ?: number
}) {
    
    const decorators : PropertyDecorator[] = [
        Type(() => Number),
        IsNumber({}, validationOptions),
    ];

    if(validationOptions?.min) {
        decorators.push(
            Min(validationOptions.min, validationOptions)
        );
    }

    if(validationOptions?.max) {
        decorators.push(
            Max(validationOptions.max, validationOptions)
        );
    }
    
    return applyDecorators(...decorators);
}
