import { CrudRepository, } from "@src/framework/clean-architecture/domain/crud-repository";
import { EntityModel, } from "@src/framework/clean-architecture/domain/entity.model";
import { DomainError, } from "@src/framework/clean-architecture/domain/error";
import { EntityIdNotFoundError, } from "@src/framework/clean-architecture/domain/errors/entity-not-found.error";
import {
    ClassType, DeepPartial, 
} from "@src/framework/types/type-utils";
import {
    transformUnknownAndValidate, validateInstance, 
} from "@src/framework/validators/class-validator-transform";


export function generateCrudService<
    Model extends EntityModel,
    CreateModelInformation extends DeepPartial<Model>,
    OnSaveErrors extends (ClassType<DomainError>[]),
    NotFoundError extends EntityIdNotFoundError,
>({
    modelClass,
    createModelInformationClass,
    notFoundError,
    onSaveErrors,
} : {
    modelClass : ClassType<Model>,
    createModelInformationClass : ClassType<CreateModelInformation>,
    notFoundError : ClassType<NotFoundError>,
    onSaveErrors : OnSaveErrors|[],
},
) {

    type OnSaveErrorsType = OnSaveErrors extends object
        ? InstanceType<OnSaveErrors[number]>
        : void

    
    abstract class CrudService {

        constructor(
            protected readonly repository : CrudRepository<Model, CreateModelInformation>,
        ) {
        }

        protected async verifyModel(
            model : CreateModelInformation | Model
        ) : Promise<void | OnSaveErrorsType> {
            if (model instanceof createModelInformationClass) {
                return this.verifyModelOnInsert(model);
            } else if (model instanceof modelClass) {
                return this.verifyModelOnUpdate(model);
            }
        }

        protected async verifyModelOnUpdate(
            model : Model
        ) : Promise<void | OnSaveErrorsType> {
            await validateInstance(model);
        }

        protected async verifyModelOnInsert(
            model : CreateModelInformation
        ) : Promise<void | OnSaveErrorsType> {
            await validateInstance(model);
        }

        protected async onCreate(model : Model) {
            // don't do anything by default
        }

        protected async onUpdate(model : Model) {
            // don't do anything by default
        }

        protected async onDelete(id : Model["id"]) {
            // don't do anything by default
        }

        public async create(
            createModelInformation : CreateModelInformation
        ) : Promise<Model | OnSaveErrorsType> {

            const validatedCreatedModelInformation = await transformUnknownAndValidate(
                createModelInformationClass,
                createModelInformation
            );

            const verifyResult = await this.verifyModel(validatedCreatedModelInformation);

            if (verifyResult) {
                return verifyResult;
            }

            const result = await this.repository.create(validatedCreatedModelInformation);

            await this.onCreate(result);

            return result;
        }

        public async getById(id : Model["id"]) : Promise<Model|NotFoundError> {

            const model = await this.repository.findById(id);

            if (!model) {
                return transformUnknownAndValidate(notFoundError, {
                    id,
                });
            }

            return model;
        }

        public async findById(id : Model["id"]) : Promise<Model | undefined> {
            return this.repository.findById(id);
        }

        public async deleteById(id : Model["id"]) : Promise<boolean> {
            const result = await this.repository.deleteById(id);

            if (result) {
                await this.onDelete(id);
            }

            return result;
        }

        public async saveModel(model : Model) : Promise<Model|OnSaveErrorsType> {

            const validatedModel = await transformUnknownAndValidate(modelClass, model);

            const verifyResult = await this.verifyModel(validatedModel);

            if (verifyResult) {
                return verifyResult;
            }

            const result = await this.repository.saveModel(validatedModel);

            await this.onUpdate(result);

            return result;
        }


    }

    return CrudService;
}
