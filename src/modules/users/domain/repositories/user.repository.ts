import { generateAbstractCRUDRepository } from '@src/framework/clean-architecture/domain/crud-repository';
import { UserModel } from '@src/modules/users/domain/models/user.model';
import { CreateUserModel } from '@src/modules/users/domain/models/create-user.model';

export abstract class UserRepository extends generateAbstractCRUDRepository(
  UserModel,
  CreateUserModel,
) {
  public abstract findByEmail(email: string): Promise<UserModel | undefined>;
}
