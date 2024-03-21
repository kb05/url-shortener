import { Injectable } from '@nestjs/common';
import { generateCrudService } from '@src/framework/clean-architecture/application/generate-crud-service';
import { ApplicationLogger } from '@src/framework/modules/global-resources/logger/logger';

import { UserModel } from '@src/modules/users/domain/models/user.model';
import { CreateUserModel } from '@src/modules/users/domain/models/create-user.model';
import { UserRepository } from '@src/modules/users/domain/repositories/user.repository';
import { UserNotFoundError } from '@src/modules/users/domain/errors/user.not-found.error';

@Injectable()
export class UserService extends generateCrudService({
  modelClass: UserModel,
  createModelInformationClass: CreateUserModel,
  notFoundError: UserNotFoundError,
  onSaveErrors: [],
}) {
  constructor(
    protected readonly userRepository: UserRepository,
    private readonly applicationLogger: ApplicationLogger,
  ) {
    super(userRepository);
  }

  public async findByEmail(email: string): Promise<UserModel | undefined> {
    return this.userRepository.findByEmail(email);
  }
}
