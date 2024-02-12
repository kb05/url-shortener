import { Model, } from "@src/framework/clean-architecture/domain/model";
import { Documentation, } from "@src/framework/documentation/documentation";
import { AppNumber, } from "@src/framework/validators/app-number.decorator";

import { ValidateCallback, } from "class-validator-callback";


export const DEFAULT_PAGE = 1;

export const DEFAULT_LIMIT = 100;

export const LIMITLESS_PAGINATION = 0;


export class PagePaginationInput extends Model {

    @Documentation({
        description : "The page number",
        example     : DEFAULT_PAGE,
    })
    @AppNumber({
        min: 1, 
    })
    @ValidateCallback(
        (paginationInput) => {
            if (paginationInput.limit === LIMITLESS_PAGINATION && paginationInput.page !== 1) {
                return false;
            }

            return true;
        },
        {
            message: `If the pagination limit is ${LIMITLESS_PAGINATION} the page must be ${DEFAULT_PAGE}.`,
        },
    )
    public page : number = DEFAULT_PAGE;

    @Documentation({
        description : "The number of items per page",
        example     : DEFAULT_LIMIT,
    })
    @AppNumber({
        min: 0, 
    })
    public limit : number = DEFAULT_LIMIT;
    
}
