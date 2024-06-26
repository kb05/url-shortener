import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res, 
} from "@nestjs/common";
import { ApiParam, } from "@nestjs/swagger";
import { APIController, } from "@src/framework/clean-architecture/adapters/controllers/API-controller.class";
import { domainErrorToDto, } from "@src/framework/clean-architecture/adapters/controllers/domain-error-to-dto";
import { DocumentAPIResponse, } from "@src/framework/documentation/document-api-response";
import { PrismaService, } from "@src/framework/modules/prisma/prisma.service";
import { isInstanceOf, } from "@src/framework/types/type-utils";
import { ResolveURLParamsDto, } from "@src/modules/URL-shortener/adapters/dtos/resolve-url-params.dto";
import {
    CreateShortURLEquivalenceAsUserUseCase,
} from "@src/modules/URL-shortener/application/use-cases/create-short-url-equivalence-as-user.use-case";
import {
    ResolveShortURLEquivalenceAsUserUseCase,
} from "@src/modules/URL-shortener/application/use-cases/resolve-short-url-equivalence-by-short-uuid-as-user.use-case";
import { DuplicatedShortUUIDError, } from "@src/modules/URL-shortener/domain/errors/duplicated-short-uuid.error";
import { DuplicatedURLError, } from "@src/modules/URL-shortener/domain/errors/duplicated-url.error";
import { ShortUUIDURLEquivalenceNotFoundError, } from "@src/modules/URL-shortener/domain/errors/short-uuid-url-equivalence.not-found.error";
import {
    CreateShortURLEquivalenceAsUser,
} from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence-as-user.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { Response, } from "express";


@Controller("short-url")
export class ShortURLController implements APIController<ShortURLController> {
    constructor(
        private readonly createShortURLEquivalenceAsUserUseCase : CreateShortURLEquivalenceAsUserUseCase,
        private readonly findShortURLEquivalenceAsUserUseCase : ResolveShortURLEquivalenceAsUserUseCase,
        private readonly prismaService : PrismaService
    ) { }


    static createShortUrlEquivalenceAsUserErrors = [DuplicatedShortUUIDError, DuplicatedURLError,];

    @DocumentAPIResponse({
        response : [ShortURLEquivalence,],
        errors   : ShortURLController.createShortUrlEquivalenceAsUserErrors,
    })
    @Post()
    async createUrlEquivalenceAsUser(
    @Body() createShortURLEquivalenceAsUser : CreateShortURLEquivalenceAsUser
    ) {
        
        const shortURLEquivalence = await this.createShortURLEquivalenceAsUserUseCase.perform({
            createShortURLEquivalenceAsUser,
        });

        if (isInstanceOf(shortURLEquivalence, ShortURLController.createShortUrlEquivalenceAsUserErrors)) {
            return domainErrorToDto(shortURLEquivalence);
        }

        return shortURLEquivalence;
    }


    static resolveURLErrors = [ShortUUIDURLEquivalenceNotFoundError,];

    @DocumentAPIResponse({
        response : [ShortURLEquivalence,],
        errors   : ShortURLController.resolveURLErrors,
    })
    @Get(":shortUUID")
    @ApiParam({
        name     : "shortUUID",
        required : true,
        type     : "string",
    })
    async resolveURL(
    @Param() resolveURLParamsDto : ResolveURLParamsDto,
        @Res() res : Response
    ) {
        
        const urlEquivalence = await this.findShortURLEquivalenceAsUserUseCase.perform({
            shortUUID: resolveURLParamsDto.shortUUID,
        });

        if (isInstanceOf(urlEquivalence, ShortURLController.resolveURLErrors)) {
            return domainErrorToDto(urlEquivalence);
        }

        const url = urlEquivalence.url.startsWith("http")
            ? urlEquivalence.url 
            : `https://${urlEquivalence.url}`;

        res.redirect(url);
    }

}
