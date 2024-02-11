import {
    HttpStatus, 
} from "@nestjs/common";
import { Documentation, } from "@src/framework/documentation/documentation";
import {
    IsNumber, IsString, 
} from "class-validator";

/**
 * The purpose is create a class which other DTOs can extend
 *
 * @export
 * @class Model
 */
export class DTO {
    
    @Documentation({
        description : "The error type",
        example     : DTO.name,
    })
    @IsString()
    public errorType ! : string;
  
    @Documentation({
        description : "The error code",
        example     : HttpStatus.INTERNAL_SERVER_ERROR,
    })
    @IsNumber()
    public code ! : number;
    
    getType() {
        return DTO;
    }
}
