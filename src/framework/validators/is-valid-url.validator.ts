import { applyDecorators, } from "@nestjs/common";
import {
    IsUrl,
    ValidationOptions,
    isURL,
} from "class-validator";
import { isString, } from "lodash";

/**
 * A decorator that validates if the url if it complies the application criteria
 *
 * @export
 * @param {ParamOptions} [options] The list of options.
 * @return {*}
 */
export function IsValidUrl(validationOptions ?: ValidationOptions) {
    return applyDecorators(
        IsUrl({
            ...validationOptions,
            require_tld: false, // To allow domains as localhost (without TLD)
        })
    );
}

export function isValidURL(url : unknown) : boolean {
    
    if (!isString(url)) {
        return false;
    }

    return isURL(url, {
        require_tld: false, 
    });
}
