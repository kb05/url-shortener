/* eslint-disable @typescript-eslint/ban-types */


import { Injectable, } from "@nestjs/common";
import { EntityModel, } from "@src/framework/clean-architecture/domain/entity.model";
import { PagePaginationOutput, } from "@src/framework/clean-architecture/domain/types/page-pagination-output.model";
import { PaginationInput, } from "@src/framework/clean-architecture/domain/types/pagination.types";
import {
    VirtualPrismaRepository,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/generate-virtual-prisma-repository-reference";
import {
    prismaPaginatedResultToPaginatePrisma,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/paginate-prisma-result-to-pagination-result";
import {
    CreationPrismaEntityFields, PrismaEntity, PrismaRepository, 
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/prisma.types";
import { PrismaService, } from "@src/framework/modules/prisma/prisma.service";
import {
    ClassType,
    DeepPartial, OmitFunctions, 
} from "@src/framework/types/type-utils";
import { transformUnknownAndValidate, } from "@src/framework/validators/class-validator-transform";
import { omit, } from "lodash";
import { createPaginator, } from "prisma-pagination";


/**
 * Create a type that contains all the properties of the entities (excluding the AppEntity fields).
 */
export type EntityProperties<T> = OmitFunctions<Omit<T, "createdAt" | "id" | "updatedAt">>

export type OmitDeepProperties<T> = T extends object ? {
    [K in keyof EntityProperties<T>] :  OmitDeepProperties<T[K]>
} : T

const paginate = createPaginator({});


export function generatePrismaCrudRepository<
    PrismaEntityType extends PrismaEntity,
    Repository extends PrismaRepository,
    EntityVirtualPrismaRepository extends VirtualPrismaRepository<PrismaEntityType, Repository>,
    Model extends EntityModel,   
    CreateModelInformation extends DeepPartial<Model>,
>({
    ModelClass,
    CreateModelInformationClass,
    entityVirtualPrismaRepository,
} : {
    entityVirtualPrismaRepository : EntityVirtualPrismaRepository,
    ModelClass : ClassType<Model>,
    CreateModelInformationClass : ClassType<CreateModelInformation>,
}) {

    type EntityRepository = EntityVirtualPrismaRepository["prismaRepository"]
    type PrismaEntityFields = EntityVirtualPrismaRepository["typeReference"]

    @Injectable()
    abstract class PrismaCrudRepository {


        // ? Related to how works prisma, is so difficult have a generic with a strict typing,
        // ? so this internal class will access to the prisma object without typing

        private readonly proxyPrismaRepository : any;
        
        protected readonly internalPrismaRepository : EntityRepository;

        constructor(
            prismaService : PrismaService
        ) {
            this.internalPrismaRepository = prismaService[entityVirtualPrismaRepository.name as any] as any;
            this.proxyPrismaRepository = this.internalPrismaRepository;
        }

        protected ModelClass : ClassType<Model> = ModelClass;

        protected ModelInformationClass : ClassType<CreateModelInformation> = CreateModelInformationClass;

        abstract entityToModel(entity : PrismaEntityFields) : Model|Promise<Model>

        abstract modelToEntity(model : Model) : PrismaEntityFields|Promise<PrismaEntityFields>

        abstract createModelInformationToEntity(
            createModelInformation : CreateModelInformation
        ) : CreationPrismaEntityFields<PrismaEntityFields>|Promise<CreationPrismaEntityFields<PrismaEntityFields>>

        
        public async create(createModelInformation : CreateModelInformation) : Promise<Model> {

            const validatedModelInformation = await transformUnknownAndValidate(
                CreateModelInformationClass,
                createModelInformation
            );

            const parsedInformation = await this.createModelInformationToEntity(validatedModelInformation);

            const entity = await this.proxyPrismaRepository.create({
                data: parsedInformation,
            });

            return this.entityToModel(entity);
        }

        public async findById(id : Model["id"]) : Promise<Model | undefined> {

            const entity = await this.proxyPrismaRepository.findFirst({
                where: {
                    id,
                },
            });

            if (!entity) {
                return undefined;
            }

            return this.entityToModel(entity);
        }


        public async deleteById(id : Model["id"]) : Promise<boolean>{
           
            try {
                await this.proxyPrismaRepository.delete({
                    where: {
                        id,
                    },
                }) as unknown as (PrismaEntityFields | undefined);

                return true;
            } catch (error) {
                return false;
            }
        }


        public async saveModel(model : Model) : Promise<Model>{

            const validatedModel = await transformUnknownAndValidate(ModelClass, model);

            const entity = await this.modelToEntity(validatedModel);

            const savedEntity = await this.proxyPrismaRepository.update({
                where: {
                    id: entity.id,
                },
                data: {
                    ...entity,
                    updatedAt: new Date(),
                },
            }) as unknown as PrismaEntityFields;

            return this.entityToModel(savedEntity);
        }

        protected async findPaginated(
            {
                pagination,
                options,
            } : {
                pagination : PaginationInput
                options ?: Parameters<EntityRepository["findMany"]>[0] & {
                    select ?: never
                }
            },
        ) : Promise<PagePaginationOutput<PrismaEntityFields>> {
                       
            const paginationOptions = omit(options, ["select",]);

            const paginatedResult = await paginate(
                this.internalPrismaRepository,
                paginationOptions,
                {
                    page    : pagination.page,
                    perPage : pagination.limit,
                }
            );
            
            
            return prismaPaginatedResultToPaginatePrisma<PrismaEntityFields>(
                paginatedResult as any
            );
        }

    }

    return PrismaCrudRepository;
}
