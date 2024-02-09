import { Model, } from "@src/framework/clean-architecture/domain/model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { ModelIntersectionType, } from "@src/framework/types/mapped-types";
import { ClassType, } from "@src/framework/types/type-utils";
import { ValidInstanceOf, } from "@src/framework/validators/valid-instance-of.validator";
import {
    IsInt, Min, 
} from "class-validator";

export const DEFAULT_PAGE_SIZE = 20;

export class PagePaginationOutput<Model> {
    
    @Documentation({
        description : "The total number of items",
        example     : 100,
    })
    @IsInt()
    @Min(0)
    readonly total ! : number;

    @Documentation({
        description : "The last page number",
        example     : 10,
    })
    @IsInt()
    @Min(0)
    readonly lastPage ! : number;

    @Documentation({
        description : "The number of items per page",
        example     : DEFAULT_PAGE_SIZE,
    })
    @IsInt()
    @Min(0)
    readonly limit ! : number;

    @Documentation({
        description : "The current page number",
        example     : 1,
    })
    @IsInt()
    @Min(1)
    readonly page ! : number;

    readonly results ! : Model[];
}

/**
 * Generate a class that extends the PagePaginationOutput but using the model validation and schema in the
 * results field.
 *
 * @export
 * @template Model
 * @param model The class instance that will be returned in the pagination
 * @return {*}
 */
export function generatePagePaginationOutput<Model>(model : ClassType<Model>) {
    class ModelPaginationClass extends Model {

        @Documentation({
            description: "The list of items filtered",
        })
        @ValidInstanceOf([model,])
        public results ! : Model[];
        
    }

    return ModelIntersectionType(
        PagePaginationOutput,
        ModelPaginationClass
    );

}
