import {
    Body,
    Controller, Get, 
} from "@nestjs/common";
import { ApiResponse, } from "@nestjs/swagger";
import { PrismaService, } from "@src/framework/modules/prisma/prisma.service";
import {
    CreateShortURLEquivalenceAsUser,
} from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence-as-user.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { AppService, } from "../../application/services/app.service";

@Controller("short-url")
export class ShortURLController {
    constructor(
        private readonly appService : AppService,
        private readonly prismaService : PrismaService
    ) { }

    @Get()
    @ApiResponse({
        type: ShortURLEquivalence,
    })
    async getHello(
        @Body() params : CreateShortURLEquivalenceAsUser
    ) : Promise<ShortURLEquivalence> {
        
        console.log(
            await this.prismaService.shortURLEquivalence.count()
        );

        throw new Error();
    }
}
