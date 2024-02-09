import {
    IntersectionType, OmitType, PartialType, PickType, 
} from "@nestjs/mapped-types";
import { EntityModel, } from "@src/framework/clean-architecture/domain/entity.model";
import { Model, } from "@src/framework/clean-architecture/domain/model";
import { ClassType, } from "@src/framework/types/type-utils";


// ? info: I am not using nestjs I am using the nestjs swagger package to extract the partial types, 
// ? which are a really useful type generators

export const Metadata_Field_Identifier = Symbol("mode-version");

export function CreationModel<T extends EntityModel>(classRef : ClassType<T>) {
    return ModelOmitType(classRef, ["id", "createdAt", "updatedAt",]);
}

/**
 * An PickType implementation but combining the result class with a model.
 */
export function ModelPickType<Class, Keys extends (string & keyof Class)>(
    classRef : ClassType<Class>, keys : readonly Keys[]
) {
    const pickTypeClass = PickType(classRef, keys);

    const newModelType = ModelType(pickTypeClass);

    return newModelType;
}

/**
 * An OmitType implementation but combining the result class with a model.
 */
export function ModelOmitType<Class, Keys extends (string & keyof Class)>(
    classRef : ClassType<Class>, keys : readonly Keys[]
) {

    const omitTypeClass = OmitType(classRef, keys);
    
    const newModelType = ModelType(omitTypeClass);

    return newModelType;
}

/**
 * A PartialType implementation but combining the result class with a model.
 */
export function ModelPartialType<Class>(classRef : ClassType<Class>) {

    const partialTypeClass = PartialType(classRef);

    const newModelType = ModelType(partialTypeClass);

    return newModelType;
}


/**
 * An Intersection implementation but combining the result class with a model.
 */
export function ModelIntersectionType<A, B>(classARef : ClassType<A>, classBRef : ClassType<B>) {

    const intersectionTypeClass = IntersectionType(classARef, classBRef);

    const newModelType = ModelType(intersectionTypeClass);

    return newModelType;
}

/**
 *  Combine a class with a dto.
 */
export function ModelType<A>(classRef : ClassType<A>) {
    const modelType = IntersectionType(classRef, Model);
    modelType.prototype.getType = () => Model;

    return modelType as unknown as ClassType<Model & Omit<A, "getType">>;
}
