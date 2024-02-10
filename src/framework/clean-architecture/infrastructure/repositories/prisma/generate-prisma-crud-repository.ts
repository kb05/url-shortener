/* eslint-disable @typescript-eslint/ban-types */

import { Injectable, } from "@nestjs/common";
import { PrismaClient, } from "@prisma/client";
import { EntityModel, } from "@src/framework/clean-architecture/domain/entity.model";
import {
    VirtualPrismaRepository,
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/generate-virtual-prisma-repository-reference";
import {
    CreationPrismaEntityFields, PrismaEntity, 
} from "@src/framework/clean-architecture/infrastructure/repositories/prisma/prisma.types";
import { PrismaService, } from "@src/framework/modules/prisma/prisma.service";

import {
    ClassType,
    DeepPartial, OmitFunctions, 
} from "@src/framework/types/type-utils";
import { transformUnknownAndValidate, } from "@src/framework/validators/class-validator-transform";


/**
 * Create a type that contains all the properties of the entities (excluding the AppEntity fields).
 */
export type EntityProperties<T> = OmitFunctions<Omit<T, "createdAt" | "id" | "updatedAt">>

export type OmitDeepProperties<T> = T extends object ? {
    [K in keyof EntityProperties<T>] :  OmitDeepProperties<T[K]>
} : T

export function generatePrismaCrudRepository<
    PrismaEntityType extends PrismaEntity,
    EntityVirtualPrismaRepository extends VirtualPrismaRepository<PrismaEntityType>,
    Model extends EntityModel,   
    CreateModelInformation extends DeepPartial<Model>
>({
    ModelClass,
    CreateModelInformationClass,
    entityVirtualPrismaRepository,
} : {
    entityVirtualPrismaRepository : EntityVirtualPrismaRepository,
    ModelClass : ClassType<Model>,
    CreateModelInformationClass : ClassType<CreateModelInformation>,
}) {

    type EntityRepository = PrismaClient[EntityVirtualPrismaRepository["name"]]
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
            this.internalPrismaRepository = prismaService[entityVirtualPrismaRepository.name];
            this.proxyPrismaRepository = this.internalPrismaRepository;
        }

        protected ModelClass : ClassType<Model> = ModelClass;

        protected ModelInformationClass : ClassType<CreateModelInformation> = CreateModelInformationClass;

        abstract entityToModel(entity : PrismaEntityFields) : Model|Promise<Model>

        abstract modelToEntity(model : Model) : PrismaEntityFields|Promise<PrismaEntityFields>

        abstract createModelInformationToEntity(
            createModelInformation : CreateModelInformation
        ) : CreationPrismaEntityFields<PrismaEntityFields>

        public async create(createModelInformation : CreateModelInformation) : Promise<Model> {

            const validatedModelInformation = await transformUnknownAndValidate(
                CreateModelInformationClass,
                createModelInformation
            );

            const parsedInformation = await this.createModelInformationToEntity(validatedModelInformation);

            const entity = await this.proxyPrismaRepository.create(parsedInformation);

            return this.entityToModel(entity);
        }

        // public async findById(id : Model["id"]) : Promise<Model | undefined> {

        //     const entity = await this.internalRepository.findOneBy({
        //         id,
        //     } as any);

        //     if (!entity) {
        //         return undefined;
        //     }

        //     return this.entityToModel(entity);
        // }


        // public async deleteById(id : Model["id"]) : Promise<boolean>{
        //     const result = await this.internalRepository.delete(id);

        //     return (result.affected ?? 0) > 0;
        // }


        // public async saveModel(model : Model) : Promise<Model>{

        //     const validatedModel = await transformUnknownAndValidate(ModelClass, model);

        //     const entity = await this.modelToEntity(validatedModel);

        //     const savedEntity = await this.internalRepository.save(entity as unknown as DeepPartial<Entity>);

        //     return this.entityToModel(savedEntity);
        // }

        // protected async findPaginated(
        //     {
        //         pagination,
        //         options = {},
        //     } : {
        //         pagination : PaginationInput,
        //         options ?: FindManyOptions<Entity>
        //     },
        // ) : Promise<PagePaginationOutput<Entity>> {
    
    
        //     if (!isNumber(pagination.page) || !isNumber(pagination.limit)) {
        //         throw new Error("The \"page\" and \"limit\" properties must be numbers.");
        //     }
    
        //     const queryOptions = _.cloneDeep(options);
    
        //     if (isObject(queryOptions.where)) {
        //         queryOptions.where = generateQueryOptionsWithoutUndefinedConditions(queryOptions.where);
        //     }
    
        //     const paginationResult = await paginate<Entity>(this.internalRepository, {
        //         ...pagination,
        //         countQueries: true,
        //     }, queryOptions);
    
    
        //     return nestjsTypeormPaginationToPagePaginationOutput<Entity>(paginationResult);
        // }

    }

    return PrismaCrudRepository;
}
