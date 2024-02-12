import {
    Global,
    Module, 
} from "@nestjs/common";
import { EventService, } from "@src/framework/modules/global-resources/events/event-service";
import { NodeEventService, } from "@src/framework/modules/global-resources/events/node-event-service";
import { ApplicationConsoleLogger, } from "@src/framework/modules/global-resources/logger/console-logger.class";
import { ApplicationLogger, } from "@src/framework/modules/global-resources/logger/logger";


@Global()
@Module({
    providers: [
        {
            provide  : ApplicationLogger,
            useClass : ApplicationConsoleLogger,
        },
        {
            provide  : EventService,
            useClass : NodeEventService,
        },
    ],
    exports: [ApplicationLogger, EventService,],
})
export class GlobalResources{}
