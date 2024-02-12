import { DomainEvent, } from "@src/framework/clean-architecture/domain/domain-event";
import { ClassType, } from "@src/framework/types/type-utils";

export abstract class EventService
{

    abstract emitEvent(event : DomainEvent) : void

    abstract subscribe<T extends DomainEvent>(
        event : ClassType<T>,
        callback : (event : T) => void
    ) : void
    
}
