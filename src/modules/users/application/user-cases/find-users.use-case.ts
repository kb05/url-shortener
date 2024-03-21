import { UseCase } from '@src/framework/clean-architecture/application/use-case';
import { UserModel } from '@src/modules/users/domain/models/user.model';
import { UserService } from '@src/modules/users/application/services/user.service';

export class FindUsersUseCase extends UseCase {
  constructor(private readonly userService: UserService) {
    super();
  }

  async perform({ user }: { user: UserModel }) {
    return await this.userService.findByEmail(user.email);
  }
}
