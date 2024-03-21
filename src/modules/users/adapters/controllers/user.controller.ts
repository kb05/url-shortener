import { Body, Controller, Post } from '@nestjs/common';
import { APIController } from '@src/framework/clean-architecture/adapters/controllers/API-controller.class';
import { CreateUserModel } from '@src/modules/users/domain/models/create-user.model';
import { UserModel } from '@src/modules/users/domain/models/user.model';

@Controller('user')
export class UserController implements APIController<UserController> {
  constructor() {}

  @Post()
  async createUsers(@Body() user: CreateUserModel) {
    console.log(`Hello ${user}, post received`);
    return new UserModel();
  }
}
