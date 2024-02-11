
import { Test, } from "@nestjs/testing";
import { GlobalResources, } from "@src/framework/modules/global-resources/global-resources.module";
import { PrismaModule, } from "@src/framework/modules/prisma/prisma.module";
import { ApplicationTestingModule, } from "@src/framework/tests/application-testing-module";
import { ClassType, } from "@src/framework/types/type-utils";


export async function generateTestingModule<T>(module : ClassType<T>) {
    
    const testModule = await Test.createTestingModule({
        imports: [
            PrismaModule,
            GlobalResources,
            module,
        ],
    }).compile();

    const applicationTestModule = new ApplicationTestingModule(testModule);
    
    return applicationTestModule;
}