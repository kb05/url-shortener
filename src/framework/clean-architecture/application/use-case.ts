import { DomainError, } from "@src/framework/clean-architecture/domain/error";
import { Model, } from "@src/framework/clean-architecture/domain/model";
import { EntityId, } from "@src/framework/validators/is-entity-id";

type UseCaseValidTypes =
    Model | Model[]  | string | string[] | Date | Date[] |
    number | number[] | boolean | boolean[] | EntityId | EntityId[] | void

type UseCaseComplexType = {
    [key : string] : UseCaseValidTypes
}

type UseCaseReturnType = UseCaseValidTypes|UseCaseComplexType|DomainError

export abstract class UseCase {
    abstract perform(...params : unknown[]) : UseCaseReturnType|Promise<UseCaseReturnType>
}
