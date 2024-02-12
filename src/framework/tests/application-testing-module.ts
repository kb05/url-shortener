import {
    TestingModule, 
} from "@nestjs/testing";
import { Prisma, } from "@prisma/client";
import { CacheService, } from "@src/framework/modules/cache/cache.service";
import { PrismaService, } from "@src/framework/modules/prisma/prisma.service";
import { ClassType, } from "@src/framework/types/type-utils";

export class ApplicationTestingModule{
    
    constructor(
        public readonly testingBuilder : TestingModule
    ) { }

    
    resolve<T>(classType : ClassType<T>|(abstract new() => T)) {
        return this.testingBuilder.get(classType);
    }

    async reset() {
        await Promise.all([
            this.resetPrismaDatabase(),
            this.resetCache(),
        ]);
    }

    async resetPrismaDatabase() {
        const prismaService = this.resolve(PrismaService);

        const tableNames = Prisma.dmmf.datamodel.models
            .map((model) => `"${model.dbName}"`);
        
        await prismaService.$executeRawUnsafe(`TRUNCATE TABLE ${tableNames.join(", ")} CASCADE;`);
    }

    async resetCache() {
        const redisService = this.resolve(CacheService);
        await redisService.reset();
    }
}
