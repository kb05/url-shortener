import {
    Injectable, OnModuleInit, 
} from "@nestjs/common";
import { EventService, } from "@src/framework/modules/global-resources/events/event-service";
import { CreateShortURLRegistryUseCase, } from "@src/modules/stats/application/use-cases/create-short-url-registry.use-case";
import { AddRequestToShortURLRegistryUseCase, } from "@src/modules/stats/application/use-cases/add-request-to-short-url-registry.use-case";
import { NewShortURLEquivalenceEvent, } from "@src/modules/URL-shortener/domain/events/new-short-URL-equivalence.event";
import { ResolvedShortURLEquivalenceEvent, } from "@src/modules/URL-shortener/domain/events/resolved-short-URL-equivalence.event";


@Injectable()
export class URLRegistryEventSubscriber implements OnModuleInit {

    constructor(
        private readonly eventService : EventService,
        private readonly createURLRegistryUseCase : CreateShortURLRegistryUseCase,
        private readonly increaseURLRegistryUseCase : AddRequestToShortURLRegistryUseCase
    ) { }
    
    onModuleInit() {
        
        this.eventService.subscribe(NewShortURLEquivalenceEvent, async newShortURLEquivalenceEvent => { 
            await this.createURLRegistryUseCase.perform({
                shortURLEquivalenceId: newShortURLEquivalenceEvent.shortURLEquivalenceId,
            });
        });

        this.eventService.subscribe(ResolvedShortURLEquivalenceEvent, async newShortURLEquivalenceEvent => { 
            await this.increaseURLRegistryUseCase.perform({
                shortURLEquivalenceId: newShortURLEquivalenceEvent.shortURLEquivalenceId,
            });
        });
    }

}
