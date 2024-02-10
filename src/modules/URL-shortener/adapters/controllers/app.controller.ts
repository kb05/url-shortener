import {
    Controller, Get, 
} from "@nestjs/common";
import { PrismaService, } from "@src/framework/modules/prisma/prisma.service";
import { AppService, } from "../../application/services/app.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService : AppService,
        private readonly prismaService : PrismaService
    ) { }

    @Get()
    async getHello() {
        
        console.log(
            await this.prismaService.shortURLEquivalence.count()
        );

        return this.appService.getHello();
    }
}
