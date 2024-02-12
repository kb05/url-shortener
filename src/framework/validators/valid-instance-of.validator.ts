/* eslint-disable @typescript-eslint/no-explicit-any */
import { Documentation, } from "@src/framework/documentation/documentation";
import { Type, } from "class-transformer";
import {
    IsArray, isArray, IsInstance, ValidateNested, 
} from "class-validator";
import { isString, } from "lodash";

/**
 * A decorator that check that the field is a valid instance of the provided class.
 *
 * @export
 * @param {(((new (...args: any[]) => any) | [new (...args: any[]) => any]))} targetType
 * @return {*}  {PropertyDecorator}
 */
export function ValidInstanceOf(
    targetType : (new (...args : any[]) => any) | [new (...args : any[]) => any],
) : PropertyDecorator {
    return function (target : object, propertyKey : string | symbol) {
        let type : any = targetType;
        if (isArray(targetType)) {
            type = targetType[0];
            IsArray()(target, propertyKey);
            ValidateNested({
                each: true,
            })(target, propertyKey);
            Documentation({
                isArray: true, 
                type,
            })(target, propertyKey);
        } else {
            ValidateNested()(target, propertyKey);
            IsInstance(targetType as new (...args : any[]) => any)(target, propertyKey);
        }
        if (isString(propertyKey)) {
            Type(() => type)(target, propertyKey);
        }
    };
}
