import {
    TestingModule, 
} from "@nestjs/testing";
import { Prisma, } from "@prisma/client";
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
        await this.resetPrismaDatabase();
    }

    async resetPrismaDatabase() {
        const prismaService = this.resolve(PrismaService);

        const tableNames = Prisma.dmmf.datamodel.models
            .map((model) => `"${model.dbName}"`);
        
        await prismaService.$executeRawUnsafe(`TRUNCATE TABLE ${tableNames.join(", ")} CASCADE;`);
    }
}
