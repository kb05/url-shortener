import {
    Injectable, OnModuleInit, 
} from "@nestjs/common";
import { EventService, } from "@src/framework/modules/global-resources/events/event-service";
import { CreateShortURLStatsUseCase, } from "@src/modules/stats/application/use-cases/create-short-url-stats.use-case";
import { IncreaseShortURLStatsUseCase, } from "@src/modules/stats/application/use-cases/increase-short-url-stats.use-case";
import { NewShortURLEquivalenceEvent, } from "@src/modules/URL-shortener/domain/events/new-short-URL-equivalence.event";
import { ResolvedShortURLEquivalenceEvent, } from "@src/modules/URL-shortener/domain/events/resolved-short-URL-equivalence.event";


@Injectable()
export class ShortURLStatsEventSubscriber implements OnModuleInit {

    constructor(
        private readonly eventService : EventService,
        private readonly createShortURLStatsUseCase : CreateShortURLStatsUseCase,
        private readonly increaseShortURLStatsUseCase : IncreaseShortURLStatsUseCase
    ) { }
    
    onModuleInit() {
        
        this.eventService.subscribe(NewShortURLEquivalenceEvent, async newShortURLEquivalenceEvent => { 
            await this.createShortURLStatsUseCase.perform({
                shortURLEquivalenceId: newShortURLEquivalenceEvent.shortURLEquivalenceId,
            });
        });

        this.eventService.subscribe(ResolvedShortURLEquivalenceEvent, async newShortURLEquivalenceEvent => { 
            await this.increaseShortURLStatsUseCase.perform({
                shortURLEquivalenceId: newShortURLEquivalenceEvent.shortURLEquivalenceId,
            });
        });
    }

}
