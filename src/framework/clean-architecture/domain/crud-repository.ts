import { EntityModel, } from "@src/framework/clean-architecture/domain/entity.model";
import {
    ClassType, DeepPartial, 
} from "@src/framework/types/type-utils";

export interface CrudRepository<Model extends EntityModel, CreateModelInformation extends DeepPartial<Model>> {

    create(createModelInformation : CreateModelInformation) : Promise<Model>

    findById(id : Model["id"]) : Promise<Model | undefined>

    deleteById(id : Model["id"]) : Promise<boolean>

    saveModel(model : Model) : Promise<Model>

}

export function generateAbstractCRUDRepository<
    Model extends EntityModel,
    CreateModelInformation extends DeepPartial<Model>
>(
    model : ClassType<Model>,
    createModelInformation : ClassType<CreateModelInformation>
) {
    
    abstract class crudRepository implements CrudRepository<Model, CreateModelInformation>{
        
        abstract create(createModelInformation : CreateModelInformation) : Promise<Model>

        abstract findById(id : number) : Promise<Model | undefined>
 
        abstract deleteById(id : number) : Promise<boolean>
 
        abstract saveModel(model : Model) : Promise<Model> 

    }

    return crudRepository;
}
