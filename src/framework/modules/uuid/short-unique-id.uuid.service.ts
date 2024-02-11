import { UUIDService, } from "@src/framework/modules/uuid/uuid.service";
import ShortUniqueId from "short-unique-id";


export class ShortUniqueIdService extends UUIDService {

    async getShortUUID(length : number) : Promise<string>{
    
        const uid = new ShortUniqueId({
            length, 
        });

        return uid.randomUUID();
    }
    
}
