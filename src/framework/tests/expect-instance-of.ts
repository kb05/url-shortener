/* eslint-disable @typescript-eslint/ban-types */
import { ClassType, } from "@src/framework/types/type-utils";


/**
 *The purpose of this function is create a jest expect that also assert that te value is a instance of
 *
 * @export
 * @template T
 * @param {Object} value
 * @param {ClassType<T>} type
 * @return {*}  {asserts}
 */
export function expectInstanceOf<T>(value : unknown, type : ClassType<T>) : asserts value is T {
    if (!(value instanceof type)) {
        throw new Error(`Expected ${value?.constructor?.name} to be instance of ${type.name}`);
    }

    expect(value).toBeInstanceOf(type);
}
