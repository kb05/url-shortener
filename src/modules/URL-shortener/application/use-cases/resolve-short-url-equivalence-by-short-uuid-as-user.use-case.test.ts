import { EventService, } from "@src/framework/modules/global-resources/events/event-service";
import { ApplicationTestingModule, } from "@src/framework/tests/application-testing-module";
import { expectInstanceOf, } from "@src/framework/tests/expect-instance-of";
import { generateTestingModule, } from "@src/framework/tests/generate-testing-module";
import {
    isValidURL, 
} from "@src/framework/validators/is-valid-url.validator";
import {
    ResolveShortURLEquivalenceAsUserUseCase,
} from "@src/modules/URL-shortener/application/use-cases/resolve-short-url-equivalence-by-short-uuid-as-user.use-case";
import { ShortUUIDURLEquivalenceNotFoundError, } from "@src/modules/URL-shortener/domain/errors/short-uuid-url-equivalence.not-found.error";

import { ResolvedShortURLEquivalenceEvent, } from "@src/modules/URL-shortener/domain/events/resolved-short-URL-equivalence.event";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { ShortURLEquivalenceBuilder, } from "@src/modules/URL-shortener/infrastructure/tests/short-url-equivalence.builder";
import { URLShortenerModule, } from "@src/modules/URL-shortener/URL-shortener.module";
import { retryUntil, } from "@src/utils/helpers/time.helpers";


describe("ResolveShortURLEquivalenceAsUserUseCase", () => {
    let applicationTestingModule : ApplicationTestingModule;

    let useCase : ResolveShortURLEquivalenceAsUserUseCase;
    let shortURLEquivalenceBuilder : ShortURLEquivalenceBuilder;
    let eventService : EventService;

    
    beforeAll(async () => {
        applicationTestingModule = await generateTestingModule(URLShortenerModule);
        useCase = applicationTestingModule.resolve(ResolveShortURLEquivalenceAsUserUseCase);
        shortURLEquivalenceBuilder = applicationTestingModule.resolve(ShortURLEquivalenceBuilder);
        eventService = applicationTestingModule.resolve(EventService);
    });

    beforeEach(async () => { 
        await applicationTestingModule.reset();
    });

    
    describe("If exist a record with the same shortUUID", () => {
        
        it("returns the short url", async () => {

            const shortUUID = "test";

            await shortURLEquivalenceBuilder.generate({
                shortUUID,
            });

            const result = await useCase.perform({
                shortUUID, 
            });

            expectInstanceOf(result, ShortURLEquivalence);
                        
            expect(isValidURL(result.url)).toBeTruthy();

        });

        it("publishes a ResolvedShortURLEquivalenceEvent after resolve the ShortURLEquivalence", async () => {

            let eventReceived : ResolvedShortURLEquivalenceEvent | undefined = undefined;

            eventService.subscribe(ResolvedShortURLEquivalenceEvent, event => eventReceived = event);

            const shortUUID = "test";

            await shortURLEquivalenceBuilder.generate({
                shortUUID,
            });

            await useCase.perform({
                shortUUID, 
            });

            await retryUntil(() => !!eventReceived);

            expect(eventReceived).toBeInstanceOf(ResolvedShortURLEquivalenceEvent);
        });

    });

    describe("If does not exist a record with the same shortUUID", () => {
        
        it("returns a ShortUUIDURLEquivalenceNotFoundError", async () => {

            const shortUUID = "test";

            const result = await useCase.perform({
                shortUUID, 
            });

            expectInstanceOf(result, ShortUUIDURLEquivalenceNotFoundError);
        
        });

    });
});
