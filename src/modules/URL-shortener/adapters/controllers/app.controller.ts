import {
    Body,
    Controller,  Post, 
} from "@nestjs/common";
import { ApiResponse, } from "@nestjs/swagger";


import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import {
    CreateShortURLEquivalenceAsUser,
} from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence-as-user.model";

import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


@Controller("short-url")
export class ShortURLController {
    constructor(
        private readonly shortUrlEquivalenceService : ShortUrlEquivalenceService,
    ) { }

    @Post()
    @ApiResponse({
        type: ShortURLEquivalence,
    })
    async getHello(
    @Body() params : CreateShortURLEquivalenceAsUser
    ) {
                
        return this.shortUrlEquivalenceService.create(
            await transformAndValidate(CreateShortURLEquivalence, {
                url      : "https://test.com",
                shortURL : "https://test.com",
            })
        );
       
    }
}
