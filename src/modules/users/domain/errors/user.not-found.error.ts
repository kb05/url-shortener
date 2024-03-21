import { EntityIdNotFoundError } from '@src/framework/clean-architecture/domain/errors/entity-not-found.error';
import { Documentation } from '@src/framework/documentation/documentation';
import {
  EntityIdExample,
  IsEntityId,
} from '@src/framework/validators/is-entity-id';
import { ShortURLEquivalence } from '@src/modules/URL-shortener/domain/models/short-url-equivalence.model';

export class UserNotFoundError extends EntityIdNotFoundError {
  private __nominal!: void;

  @Documentation({
    description: 'The id of user was not found',
    example: EntityIdExample,
  })
  @IsEntityId()
  public id!: ShortURLEquivalence['id'];

  public describe(): string {
    return `The user with the id ${this.id} was not found.`;
  }
}
