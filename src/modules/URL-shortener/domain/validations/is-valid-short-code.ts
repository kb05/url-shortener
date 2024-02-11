import { applyDecorators, } from "@nestjs/common";
import { IsNotEmptyString, } from "@src/framework/validators/is-not-empty-string-validator";
import { AppStringSize, } from "@src/framework/validators/string-size-validator";
import {
    Matches,
    MaxLength,
    ValidationOptions, 
} from "class-validator";
import { isString, } from "lodash";


const ValidShortCodeREGEX = /^[a-zA-Z0-9]+$/;
/**
 * This function verifies if the provided code is a valid short code
 *
 * @export
 * @param {string} code
 * @return {*}  {boolean}
 */
export function isValidShortCode(code : unknown) : boolean {
    
    if (!isString(code)) {
        return false;
    }
    
    return  ValidShortCodeREGEX.test(code);
}


/**
 * A decorator that validates if the url if the short code complies the specified criteria
 *
 * @export
 * @param {ParamOptions} [options] The list of options.
 * @return {*}
 */
export function IsValidShortCode(validationOptions ?: ValidationOptions) {
    return applyDecorators(
        IsNotEmptyString(validationOptions),
        MaxLength(AppStringSize.SHORT, validationOptions),
        Matches(ValidShortCodeREGEX, {
            ...validationOptions,
        })
    );
}
