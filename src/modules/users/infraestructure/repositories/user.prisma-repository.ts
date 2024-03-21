import { UserRepository } from '@src/modules/users/domain/repositories/user.repository';
import { generatePrismaCrudRepository } from '@src/framework/clean-architecture/infrastructure/repositories/prisma/generate-prisma-crud-repository';
import { CreateUserModel } from '@src/modules/users/domain/models/create-user.model';
import { generateVirtualPrismaRepositoryReference } from '@src/framework/clean-architecture/infrastructure/repositories/prisma/generate-virtual-prisma-repository-reference';
import { PrismaUser } from '@prisma/client';
import { UserModel } from '@src/modules/users/domain/models/user.model';
import { CreationPrismaEntityFields } from '@src/framework/clean-architecture/infrastructure/repositories/prisma/prisma.types';
import { transformAndValidate } from '@src/framework/validators/class-validator-transform';

export class UserPrismaRepository
  extends generatePrismaCrudRepository({
    CreateModelInformationClass: CreateUserModel,
    ModelClass: UserModel,
    entityVirtualPrismaRepository: generateVirtualPrismaRepositoryReference<
      PrismaUser,
      'prismaUser'
    >('prismaUser'),
  })
  implements UserRepository
{
  createModelInformationToEntity(
    createModelInformation: CreateUserModel,
  ): CreationPrismaEntityFields<PrismaUser> {
    return {
      name: createModelInformation.name,
      surname: createModelInformation.surname,
      email: createModelInformation.email,
      age: createModelInformation.age,
    };
  }

  async entityToModel(entity: PrismaUser): Promise<UserModel> {
    return transformAndValidate(UserModel, {
      ...entity,
    });
  }

  modelToEntity(model: UserModel): PrismaUser {
    return {
      id: model.id,
      email: model.email,
      surname: model.surname,
      name: model.name,
      age: model.age,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  //TODO: FindByAge, FindBySurname, etc?
  public async findByEmail(email: string): Promise<UserModel | undefined> {
    const entity = await this.internalPrismaRepository.findFirst({
      where: { email },
    });

    if (!entity) {
      return undefined;
    }

    return this.entityToModel(entity);
  }
}
