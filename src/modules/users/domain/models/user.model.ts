import { EntityModel } from '@src/framework/clean-architecture/domain/entity.model';
import { Documentation } from '@src/framework/documentation/documentation';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserModel extends EntityModel {
  private __nominal!: string;

  @Documentation({
    description: 'The user email',
    example: 'rodriguez.sanchez@gmail.com',
  })
  @IsEmail()
  public email!: string;

  @IsString()
  public name!: string;

  @IsString()
  public surname!: string;

  @IsNumber()
  public age!: number;
}
