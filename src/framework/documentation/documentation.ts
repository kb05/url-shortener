/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, } from "@nestjs/common";
import {
    ApiProperty, 
} from "@nestjs/swagger";
import { ClassType, } from "@src/framework/types/type-utils";
import {
    Expose, 
} from "class-transformer";

import {
    cloneDeep, 
} from "lodash";


export type DocumentationProperties = {
    description ?: string
    example ?: unknown
    required ?: boolean
    isArray ?: boolean
    type ?: ClassType<unknown>
}

/**
 * The purpose of this decorator is abstract the api documentation from the library that will be 
 * used to document the api.
 */
export function Documentation(properties : DocumentationProperties) : Function {

    const documentationProperties : DocumentationProperties = cloneDeep(properties);

    return applyDecorators(ApiProperty(documentationProperties), Expose());
}
