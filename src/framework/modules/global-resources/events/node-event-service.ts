import { EventEmitter, } from "stream";
import { Injectable, } from "@nestjs/common";
import {
    DomainEvent,
} from "@src/framework/clean-architecture/domain/domain-event";
import { EventService, } from "@src/framework/modules/global-resources/events/event-service";
import { ApplicationLogger, } from "@src/framework/modules/global-resources/logger/logger";
import { ClassType, } from "@src/framework/types/type-utils";


//? Currently I am using node-events because it's a easy way to have events in a local environment
//? but perfectly we could have a rabbitMQ, SQSS or another queue mechanism
@Injectable()
export class NodeEventService extends EventService
{

    private readonly eventEmitter : EventEmitter;


    constructor(
        private readonly logger : ApplicationLogger,
    ) {
        super();
        this.eventEmitter = new EventEmitter();
    }
    
    protected extractEventKeyForEvent(event : DomainEvent) : string {
        return event.constructor.name;
    }

    protected extractEventKeyForEventConstructor(event : ClassType<DomainEvent>) : string {
        return event.name;
    }

    public emitEvent(event : DomainEvent) {
        
        this.logger.info({
            description : "A new event has been emitted",
            event       : event.constructor.name,
        });
        
        this.eventEmitter.emit(
            this.extractEventKeyForEvent(event),
            event
        );
    }

    public subscribe<T extends DomainEvent>(
        event : ClassType<DomainEvent>,
        callback : (event : T) => void
    ) {
        return this.eventEmitter.on(
            this.extractEventKeyForEventConstructor(event),
            async (event : any) => {
                try {
                    await callback(event as T);
                } catch (error) {
                    this.logger.error({
                        message: `An Error ocurred while handling event ${event.constructor.name}`,
                    });
                }
                
            }
        );
    
    }
    
}
