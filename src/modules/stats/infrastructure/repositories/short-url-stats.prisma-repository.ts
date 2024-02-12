import { Injectable, } from "@nestjs/common";
import {
    prismaPaginatedResultToPaginatePrisma,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/paginate-prisma-result-to-pagination-result";
import { PrismaService, } from "@src/framework/modules/prisma/prisma.service";
import { transformUnknownAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortURLStatsPaginationInput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-input.model";
import { ShortURLStatsPaginationOutput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-output.model";
import { ShortURLStatsRepository, } from "@src/modules/stats/domain/repositories/short-url-stats.repository";
import { get, } from "lodash";
import { createPaginator, } from "prisma-pagination";


const paginate = createPaginator({});

@Injectable()
export class ShortURLStatsPrismaRepository implements ShortURLStatsRepository {
    
    constructor(
        private readonly prismaService : PrismaService
    ){}


    async findByPaginated(shortURLStatsPaginationInput : ShortURLStatsPaginationInput) : Promise<ShortURLStatsPaginationOutput> {
       

        // const rawResults = await this.prismaService.prismaShortURLRegistry.findMany({
        //     select: {
        //         numberOfRequests    : true,
        //         shortURLEquivalence : true,
        //     },
        //     where: {
        //         shortURLEquivalence: {
        //             url: shortURLStatsPaginationInput.url && {
        //                 contains: shortURLStatsPaginationInput.url,
        //             },
        //             shortUUID: shortURLStatsPaginationInput.shortUUID && {
        //                 contains: shortURLStatsPaginationInput.shortUUID,
        //             },
        //         },
        //     },
        //     orderBy: {
        //         createdAt: "desc",
        //     },
        // });

        const paginatedResult = prismaPaginatedResultToPaginatePrisma(
            await paginate(
                this.prismaService.prismaShortURLRegistry,
                {
                    select: {
                        numberOfRequests    : true,
                        updatedAt           : true,
                        shortURLEquivalence : true,
                    },
                    where: {
                        shortURLEquivalence: {
                            url: shortURLStatsPaginationInput.url && {
                                contains: shortURLStatsPaginationInput.url,
                            },
                            shortUUID: shortURLStatsPaginationInput.shortUUID && {
                                contains: shortURLStatsPaginationInput.shortUUID,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                {
                    page    : shortURLStatsPaginationInput.page,
                    perPage : shortURLStatsPaginationInput.limit,
                }
            )
        );


        return transformUnknownAndValidate(ShortURLStatsPaginationOutput, {
            ...paginatedResult,
            results: paginatedResult.results.map(entity => {
                return {
                    numberOfRequests : get(entity, "numberOfRequests"),
                    lastAccess       : get(entity, "updatedAt"),
                    shortUUID        : get(entity, "shortURLEquivalence.shortUUID"),
                    url              : get(entity, "shortURLEquivalence.url"),
                };
            }),
        });

    }
   

}
