import {
    Global,
    Module, 
} from "@nestjs/common";
import { EventService, } from "@src/framework/modules/global-resources/events/event-service";
import { NodeEventService, } from "@src/framework/modules/global-resources/events/node-event-service";
import { ApplicationLogger, } from "@src/framework/modules/global-resources/logger/logger";
import { ApplicationNoLogger, } from "@src/framework/modules/global-resources/logger/no-logger.class";


@Global()
@Module({
    providers: [
        {
            provide  : ApplicationLogger,
            useClass : ApplicationNoLogger,
        },
        {
            provide  : EventService,
            useClass : NodeEventService,
        },
    ],
    exports: [ApplicationLogger, EventService,],
})
export class TestGlobalResources{}
