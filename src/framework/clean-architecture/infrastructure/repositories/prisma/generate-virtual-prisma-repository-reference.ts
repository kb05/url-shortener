import {
    GlobalPrismaRepositories, PrismaEntity,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/prisma.types";


export type VirtualPrismaRepository<T extends PrismaEntity> = {
    name : (keyof GlobalPrismaRepositories) & string,
    typeReference : T // This value is virtual, is only a reference to user the mapper with strict typing
}

export function generateVirtualPrismaRepositoryReference<T extends PrismaEntity>(
    name : (keyof GlobalPrismaRepositories) & string,
) {
    return {
        name,
        typeReference: undefined,
    } as unknown as VirtualPrismaRepository<T>;
    
}
