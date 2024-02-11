import {
    ConsoleLogger, Global, Module, 
} from "@nestjs/common";
import { ApplicationLogger, } from "@src/framework/modules/global-resources/logger.class";


@Global()
@Module({
    providers: [{
        provide  : ApplicationLogger,
        useClass : ConsoleLogger,
    },],
    exports: [ApplicationLogger,],
})
export class GlobalResources{}
