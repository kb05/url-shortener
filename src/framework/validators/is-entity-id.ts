import { applyDecorators, } from "@nestjs/common";
import { Type, } from "class-transformer";
import {
    IsInt,
    Min,
    ValidationOptions, 
} from "class-validator";
import { isNumber, } from "lodash";

export type EntityId = number
export const EntityIdExample = 1234;
export const EntityIdParamExpression = "[0-9]+";

/**
 * A decorator that applies the required class validator options to validate an application entity id.
 *
 * @export
 * @param {ParamOptions} [options] The list of options.
 * @return {*}
 */
export function IsEntityId(validationOptions ?: ValidationOptions) {
    return applyDecorators(IsInt(validationOptions), Min(0, validationOptions), Type(() => Number));
}

/**
 * Verifies if the provided value is a valid entity id
 *
 * @export
 * @param {number} value
 * @return {*}
 */
export function isEntityId(value : unknown) : value is EntityId {
    return isNumber(value) && value >= 0;
}
