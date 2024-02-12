import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


@Injectable()
export class FindShortURLEquivalenceAsUserUseCase extends UseCase {
    
    constructor(
        private readonly shortURLEquivalenceService : ShortUrlEquivalenceService,
    ) {
        super(); 
    }

    async perform({ shortUUID, } : { shortUUID : ShortURLEquivalence["shortUUID"] }) {
  
        return this.shortURLEquivalenceService.getByShortUUID(shortUUID);
    }

  
}
