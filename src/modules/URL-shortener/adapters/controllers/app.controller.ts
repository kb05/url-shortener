import {
    Body,
    Controller,  Post, 
} from "@nestjs/common";
import { ApiResponse, } from "@nestjs/swagger";

import { PrismaService, } from "@src/framework/modules/prisma/prisma.service";

import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import {
    CreateShortURLEquivalenceAsUser,
} from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence-as-user.model";

import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import {
    ShortURLEquivalencePrismaRepository,
} from "@src/modules/URL-shortener/infrastructure/repositories/short-url-equivalence.repository";
import { AppService, } from "../../application/services/app.service";

@Controller("short-url")
export class ShortURLController {
    constructor(
        private readonly appService : AppService,
        private readonly prismaService : PrismaService,
        private readonly shortURLEquivalencePrismaRepository : ShortURLEquivalencePrismaRepository,
    ) { }

    @Post()
    @ApiResponse({
        type: ShortURLEquivalence,
    })
    async getHello(
    @Body() params : CreateShortURLEquivalenceAsUser
    ) {
                
        this.shortURLEquivalencePrismaRepository.create(
            await transformAndValidate(CreateShortURLEquivalence, {
                url      : "https://test.com",
                shortURL : "https://test.com",
            })
        );
        
        const aux = await this.shortURLEquivalencePrismaRepository.test();

        return aux;      

        // this.prismaService.shortURLEquivalence.update()

        // await this.prismaService.shortURLEquivalence.create({
        //     select: {
        //         shortURL
        //     }
        //     data: {
        //         shortURL : "test",
        //         url      : "test",
        //     },
        // });

       
    }
}
