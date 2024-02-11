import { Model, } from "@src/framework/clean-architecture/domain/model";

/**
 * This interface force that all the controller methods are functions that return a valid dto.
 */
type ValidType = undefined | null | Model
type ValidControllerReturnType = Promise<ValidType> | ValidType

export type APIController<T> = {
    [K in keyof T] : T[K] extends  ((...args : any) => any)
        ? (...args : any) => ValidControllerReturnType
        : never
}
