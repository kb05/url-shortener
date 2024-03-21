import { CreationModel } from '@src/framework/types/mapped-types';
import { UserModel } from '@src/modules/users/domain/models/user.model';

export class CreateUserModel extends CreationModel(UserModel) {
  private __nominal!: void;
}
