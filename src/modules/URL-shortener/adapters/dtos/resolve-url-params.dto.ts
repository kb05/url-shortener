import { DTO, } from "@src/framework/clean-architecture/adapters/controllers/dto";
import { IsNotEmptyString, } from "@src/framework/validators/is-not-empty-string-validator";


export class ResolveURLParamsDto extends DTO {
    
    @IsNotEmptyString()
    public shortUUID ! : string;
}
