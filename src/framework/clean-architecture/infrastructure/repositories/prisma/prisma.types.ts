import { PrismaService, } from "@src/framework/modules/prisma/prisma.service";
import { EntityId, } from "@src/framework/validators/is-entity-id";

export type GlobalPrismaRepositories = Omit<
PrismaService,
"$disconnect" | "$connect" | "$executeRaw" | "$queryRaw" | "$transaction" | "$on" |
"$executeRaw" | "$extends" | "$executeRawUnsafe" | "$queryRawUnsafe" | "onModuleInit" |
"$use"
>

export type PrismaEntity = {
    id : EntityId,
    createdAt : Date,
    updatedAt : Date,
}

export type CreationPrismaEntityFields<T extends PrismaEntity> = Omit<T, "id" | "createdAt" | "updatedAt">

export type PrismaRepository = { 
    findMany(params : unknown) : unknown
    findFirst(params : unknown) : unknown
}
