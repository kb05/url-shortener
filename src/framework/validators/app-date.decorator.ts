import { applyDecorators, } from "@nestjs/common";
import {
    Transform, Type, 
} from "class-transformer";
import {
    
    
    isString,
} from "class-validator";


/**
 * A decorator that validates if the provided value is a date
 * If the object is not a date but it a string date the transform method will transform the string into a date
 *
 * @export
 * @param {ParamOptions} [options] The list of options.
 * @return {*}
 */
export function AppDate() {
    return applyDecorators(
        Type(() => Date),
        Transform(({ value, }) => isString(value) ? new Date(value) : value)
    );
}
