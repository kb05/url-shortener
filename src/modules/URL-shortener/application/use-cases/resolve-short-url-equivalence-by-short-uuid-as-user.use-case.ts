import { Injectable, } from "@nestjs/common";
import { UseCase, } from "@src/framework/clean-architecture/application/use-case";
import { isDomainError, } from "@src/framework/clean-architecture/domain/errors/is-domain-error";
import { EventService, } from "@src/framework/modules/global-resources/events/event-service";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import { ResolvedShortURLEquivalenceEvent, } from "@src/modules/URL-shortener/domain/events/resolved-short-URL-equivalence.event";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";


@Injectable()
export class ResolveShortURLEquivalenceAsUserUseCase extends UseCase {
    
    constructor(
        private readonly shortURLEquivalenceService : ShortUrlEquivalenceService,
        private readonly eventService : EventService,
    ) {
        super(); 
    }

    async perform({ shortUUID, } : { shortUUID : ShortURLEquivalence["shortUUID"] }) {
  
        const shortURLEquivalence = await this.shortURLEquivalenceService.getByShortUUID(shortUUID);

        if (isDomainError(shortURLEquivalence)) {
            return shortURLEquivalence;
        }

        this.eventService.emitEvent(
            await transformAndValidate(ResolvedShortURLEquivalenceEvent, {
                shortURLEquivalenceId: shortURLEquivalence.id,
            })
        );

        return shortURLEquivalence;
    }

  
}
