import { Documentation, } from "@src/framework/documentation/documentation";
import {
    IsDefined, 
} from "class-validator";


/**
 * The purpose is create a class which other errors can extend
 *
 * @export
 * @class DomainError
 */
export abstract class DomainError {

    @Documentation({
        description : "A description about the error",
        example     : "A description about the error",
    })
    @IsDefined()
    description() : string {
        return this.describe();
    }

    abstract describe() : string
    
    getType() {
        return DomainError;
    }
}
