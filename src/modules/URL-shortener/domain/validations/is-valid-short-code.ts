import { applyDecorators, } from "@nestjs/common";
import { IsNotEmptyString, } from "@src/framework/validators/is-not-empty-string-validator";
import { AppStringSize, } from "@src/framework/validators/string-size-validator";
import {
    IsNumber,
    Matches,
    Max,
    ValidationOptions, 
} from "class-validator";
import { isString, } from "lodash";


const ValidShortCodeREGEX = /^[a-zA-Z]+$/;
/**
 * This function verifies if the provided code is a valid short code
 *
 * @export
 * @param {string} code
 * @return {*}  {boolean}
 */
export function isValidShortedCode(code : unknown) : boolean {
    
    if (!isString(code)) {
        return false;
    }
    
    return  ValidShortCodeREGEX.test(code);
}


/**
 * A decorator that validates if the url if the shorted code complies the specified criterias
 *
 * @export
 * @param {ParamOptions} [options] The list of options.
 * @return {*}
 */
export function IsValidShortedCode(validationOptions ?: ValidationOptions) {
    return applyDecorators(
        IsNotEmptyString(validationOptions),
        Max(AppStringSize.SHORT, validationOptions),
        IsNumber(),
        Matches(ValidShortCodeREGEX, {
            message: "The provided short code is not valid",
            ...validationOptions,
        })
    );
}