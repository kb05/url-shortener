import { applyDecorators, } from "@nestjs/common";
import {
    IsUrl,
    ValidationOptions,
} from "class-validator";

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
