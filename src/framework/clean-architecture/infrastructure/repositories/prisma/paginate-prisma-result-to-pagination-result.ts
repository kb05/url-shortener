import { PagePaginationOutput, } from "@src/framework/clean-architecture/domain/types/page-pagination-output.model";
import {
    PaginatedResult,
} from "prisma-pagination";

export function prismaPaginatedResultToPaginatePrisma<T>(paginatedResult : PaginatedResult<T>) : PagePaginationOutput<T> {
    return {
        total    : paginatedResult.meta.total,
        lastPage : paginatedResult.meta.lastPage,
        limit    : paginatedResult.meta.perPage,
        page     : paginatedResult.meta.currentPage,
        results  : paginatedResult.data,
    };
    
}
