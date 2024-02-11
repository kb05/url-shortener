import {
    Module, 
} from "@nestjs/common";

import { ShortUniqueIdService, } from "@src/framework/modules/uuid/short-unique-id.uuid.service";
import { UUIDService, } from "@src/framework/modules/uuid/uuid.service";

@Module({
    providers: [
        {
            provide  : UUIDService,
            useClass : ShortUniqueIdService,
        },
    ],
    exports: [UUIDService,],
})
export class UUIDModule {}
