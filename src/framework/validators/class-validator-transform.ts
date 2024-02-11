import { inspect, } from "util";
import {
    ClassType, OmitDeepFunctions, 
} from "@src/framework/types/type-utils";
import { plainToClass, } from "class-transformer";
import {
    validateOrReject,
    validateSync, 
    ValidationError, 
} from "class-validator";
import { isArray, } from "lodash";
  

export class AppValidationError extends Error {
    constructor(public readonly validationErrors : ValidationError[]) {
        super();
        
        this.message = inspect({
            validationErrors,
        }, {
            showHidden : false,
            depth      : null,
        });
    }
}


export async function transformAndValidate<T extends object>(classType : ClassType<T>, object : OmitDeepFunctions<T>) {
    return transformUnknownAndValidate(classType, object);
}

export async function transformUnknownAndValidate<T extends object>(classType : ClassType<T>, object : unknown) {
    const result = transformUnknownWithoutValidate(classType, object);

    await validateInstance(result);

    return result;
}

export function transformUnknownWithoutValidate<T extends object>(classType : ClassType<T>, object : unknown) {
    const result = plainToClass(classType, object, {
        excludeExtraneousValues: true,
    });

    return result;
}

export function transformUnknownAndValidateSync<T extends object>(classType : ClassType<T>, object : unknown) {
    const result = plainToClass(classType, object, {
        excludeExtraneousValues: true,
    });

    const validationErrors = validateSync(result);

    if (validationErrors.length) {
        throw new AppValidationError(validationErrors);
    }

    return result;
}

export function transformAndValidateSync<T extends object>(classType : ClassType<T>, object : OmitDeepFunctions<T>) {
    const result = plainToClass(classType, object, {
        excludeExtraneousValues: true,
    });

    const validationErrors = validateSync(result);

    if (validationErrors.length) {
        throw new AppValidationError(validationErrors);
    }

    return result;
}

export async function validateInstance(object : object) {
    try {
        await validateOrReject(object);
    } catch (error) {
        if (isArray(error)) {
            throw new AppValidationError(error);
        }
        throw error;
    }
}
