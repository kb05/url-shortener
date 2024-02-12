import {
    Injectable, OnModuleInit, 
} from "@nestjs/common";
import { EventService, } from "@src/framework/modules/global-resources/events/event-service";
import { CreateShortURLStatsUseCase, } from "@src/modules/stats/application/use-cases/create-short-url-stats.use-case";
import { NewShortURLEquivalenceEvent, } from "@src/modules/URL-shortener/domain/events/new-short-URL-equivalence.event";


@Injectable()
export class ShortURLStatsSubscriber implements OnModuleInit {

    constructor(
        private readonly eventService : EventService,
        private readonly createShortURLStatsUseCase : CreateShortURLStatsUseCase,
    ) { }
    
    onModuleInit() {
        this.eventService.subscribe(NewShortURLEquivalenceEvent, async newShortURLEquivalenceEvent => { 
            await this.createShortURLStatsUseCase.perform({
                shortURLEquivalenceId: newShortURLEquivalenceEvent.shortURLEquivalenceId,
            });
        });
    }

}
