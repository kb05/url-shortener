import {
    Global,
    Module, 
} from "@nestjs/common";
import { ApplicationConsoleLogger, } from "@src/framework/modules/global-resources/console-logger.class";
import { ApplicationLogger, } from "@src/framework/modules/global-resources/logger";


@Global()
@Module({
    providers: [{
        provide  : ApplicationLogger,
        useClass : ApplicationConsoleLogger,
    },],
    exports: [ApplicationLogger,],
})
export class GlobalResources{}
