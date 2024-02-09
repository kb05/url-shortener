import { NotFoundDomainError, } from "@src/framework/clean-architecture/domain/errors/not-found.error";
import { EntityId, } from "@src/framework/validators/is-entity-id";


export abstract class EntityIdNotFoundError extends NotFoundDomainError {

    abstract id : EntityId

}
