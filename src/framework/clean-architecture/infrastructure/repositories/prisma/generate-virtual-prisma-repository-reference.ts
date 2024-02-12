import {
    GlobalPrismaRepositories, PrismaEntity,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/prisma.types";
import { PrismaService, } from "@src/framework/modules/prisma/prisma.service";


export type VirtualPrismaRepository<VirtualPrismaEntity extends PrismaEntity, VirtualPrismaRepository> = {
    name : (keyof GlobalPrismaRepositories) & string,
    prismaRepository : VirtualPrismaRepository,
    typeReference : VirtualPrismaEntity // This value is virtual, is only a reference to user the mapper with strict typing
}

export function generateVirtualPrismaRepositoryReference<
    VirtualPrismaEntity extends PrismaEntity,
    PrismaEntityName extends string & keyof GlobalPrismaRepositories & keyof PrismaService
>(
    name : PrismaEntityName,
) {
    return {
        name,
        typeReference: undefined,
    } as unknown as VirtualPrismaRepository<VirtualPrismaEntity, PrismaService[typeof name]>;
    
}
