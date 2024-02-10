import { applyDecorators, } from "@nestjs/common";
import { isEnumValue, } from "@src/framework/types/type-utils";
import { AppStringSize, } from "@src/framework/validators/string-size-validator";
import {
    isNotEmpty,
    IsNotEmpty,
    IsString,
    Min,
    ValidationOptions,
} from "class-validator";
import {
    cloneDeep, isObject, isString, 
} from "lodash";

/**
 * A decorator that check that the field is a not empty string.
 * A not empty string is a string with at least one character.
 *
 * @export
 * @param {(((new (...args: any[]) => any) | [new (...args: any[]) => any]))} targetType
 * @return {*}  {PropertyDecorator}
 */
export function IsNotEmptyString(
    param ?: AppStringSize |
    (
        ValidationOptions & {
            size ?: AppStringSize
        }
    )
) : PropertyDecorator {
    
    const validators : PropertyDecorator[] = [];

    const validationOptions = isObject(param) ? param : undefined;

    const options = cloneDeep(validationOptions);

    const size = isEnumValue(param, AppStringSize) ? param : options?.size;
    
    if (size) {
        delete options?.size;
        validators.push(Min(size));
    }


    validators.push(IsString(validationOptions));
    validators.push(IsNotEmpty(validationOptions));


    return applyDecorators(...validators);
}

/**
 * A function that check that a value is a not empty string.
 * A not empty string is a string with at least one character.
 *
 * @export
 * @param unknown value
 * @return boolean that indicates if it is an empty string or not
 */
export function isNotEmptyString(value : unknown) : value is string {

    return isString(value) && isNotEmpty(value);
}
