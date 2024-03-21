import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/framework/modules/prisma/prisma.module';
import { ShortUrlEquivalenceService } from '@src/modules/URL-shortener/application/services/short-url-equivalence.service';
import { ShortURLEquivalenceBuilder } from '@src/modules/URL-shortener/infrastructure/tests/short-url-equivalence.builder';
import { ShortURLEquivalenceRepository } from '@src/modules/URL-shortener/domain/repositories/short-url-equivalence.repository';
import { ShortURLEquivalencePrismaCacheRepository } from '@src/modules/URL-shortener/infrastructure/repositories/short-url-equivalence.prisma-cache-repository';
import { CreateShortURLEquivalenceAsUserUseCase } from '@src/modules/URL-shortener/application/use-cases/create-short-url-equivalence-as-user.use-case';
import { ResolveShortURLEquivalenceAsUserUseCase } from '@src/modules/URL-shortener/application/use-cases/resolve-short-url-equivalence-by-short-uuid-as-user.use-case';
import { UserController } from '@src/modules/users/adapters/controllers/user.controller';
import { UserService } from '@src/modules/users/application/services/user.service';
import { UserRepository } from '@src/modules/users/domain/repositories/user.repository';
import { UserPrismaRepository } from '@src/modules/users/infraestructure/repositories/user.prisma-repository';
import { FindUsersUseCase } from '@src/modules/users/application/user-cases/find-users.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository, //provide
      useClass: UserPrismaRepository, //useClass
    },
    FindUsersUseCase,
  ],
  //exports: [ShortUrlEquivalenceService, ShortURLEquivalenceBuilder],
})
export class UserModule {}
