import { Injectable, } from "@nestjs/common";
import { UUIDService, } from "@src/framework/modules/uuid/uuid.service";
import ShortUniqueId from "short-unique-id";

@Injectable()
export class ShortUniqueIdService extends UUIDService {

    async getShortUUID(length : number) : Promise<string>{
    
        const uid = new ShortUniqueId({
            length, 
        });

        return uid.randomUUID();
    }
    
}
