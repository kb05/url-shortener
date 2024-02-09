/**
 * This type generate a type that is a constructor of the provided class.
 *
 * @see https://stackoverflow.com/questions/39614311/class-constructor-type-in-typescript
 */
export declare type ClassType<T> = new (...args : any[]) => T

// 1 Transform the type to flag all the undesired keys as 'never'.
export type FlagExcludedType<Base> = {
    [Key in keyof Base] : Base[Key] extends Function ? never : Key
}

// 2 Get the keys that are not flagged as 'never'.
export type AllowedNames<Base> = FlagExcludedType<Base>[keyof Base]

// 3 Use this with a simple Pick to get the right interface, excluding the undesired type.
export type OmitType<Base> = Pick<Base, AllowedNames<Base>>

/**
 * Create a type that remove the function fields of the provided type.
 */
export type OmitFunctions<Base> = Pick<Base, AllowedNames<Base>>
  
export type OmitDeepFunctions<T> = T extends object ?
    T extends Date
        ? T
        : {
            [K in keyof OmitFunctions<T>] :  OmitDeepFunctions<T[K]>
        } : T

/**
 * Same as Partial<T> but goes deeper and makes Partial<T> all its properties and sub-properties.
 */
export type DeepPartial<T> = T | (T extends Array<infer U>
    ? DeepPartial<U>[] :
    T extends Map<infer K, infer V>
        ? Map<DeepPartial<K>, DeepPartial<V>>
        : T extends Set<infer M>
            ? Set<DeepPartial<M>>
            : T extends object ? { [K in keyof T] ?: DeepPartial<T[K]>; } : T
);
