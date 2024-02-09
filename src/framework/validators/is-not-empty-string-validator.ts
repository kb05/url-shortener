import { applyDecorators, } from "@nestjs/common";
import {
    isNotEmpty,
    IsNotEmpty,
    IsString,
    ValidationOptions,
} from "class-validator";
import { isString, } from "lodash";

/**
 * A decorator that check that the field is a not empty string.
 * A not empty string is a string with at least one character.
 *
 * @export
 * @param {(((new (...args: any[]) => any) | [new (...args: any[]) => any]))} targetType
 * @return {*}  {PropertyDecorator}
 */
export function IsNotEmptyString(validationOptions ?: ValidationOptions) : PropertyDecorator {

    return applyDecorators(
        IsString(validationOptions),
        IsNotEmpty(validationOptions),
    );
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
