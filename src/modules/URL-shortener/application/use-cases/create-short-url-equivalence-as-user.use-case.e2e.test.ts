import { EventService, } from "@src/framework/modules/global-resources/events/event-service";
import { ApplicationTestingModule, } from "@src/framework/tests/application-testing-module";
import { expectInstanceOf, } from "@src/framework/tests/expect-instance-of";
import { generateTestingModule, } from "@src/framework/tests/generate-testing-module";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import {
    isValidURL, 
} from "@src/framework/validators/is-valid-url.validator";
import {
    CreateShortURLEquivalenceAsUserUseCase,
} from "@src/modules/URL-shortener/application/use-cases/create-short-url-equivalence-as-user.use-case";
import { DuplicatedShortUUIDError, } from "@src/modules/URL-shortener/domain/errors/duplicated-short-uuid.error";
import { DuplicatedURLError, } from "@src/modules/URL-shortener/domain/errors/duplicated-url.error";
import { NewShortURLEquivalenceEvent, } from "@src/modules/URL-shortener/domain/events/new-short-URL-equivalence.event";
import { CreateShortURLEquivalenceAsUser, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence-as-user.model";

import { CreateShortURLEquivalenceResponse, } from "@src/modules/URL-shortener/domain/models/created-short-url-equivalence-response.model";

import { ShortURLEquivalenceRepository, } from "@src/modules/URL-shortener/domain/repositories/short-url-equivalence.repository";

import { ShortURLEquivalenceBuilder, } from "@src/modules/URL-shortener/infrastructure/tests/short-url-equivalence.builder";
import { URLShortenerModule, } from "@src/modules/URL-shortener/URL-shortener.module";
import { retryUntil, } from "@src/utils/helpers/time.helpers";


describe("CreateShortURLEquivalenceAsUserUseCase", () => {
    let applicationTestingModule : ApplicationTestingModule;

    let useCase : CreateShortURLEquivalenceAsUserUseCase;
    let shortURLEquivalenceRepository : ShortURLEquivalenceRepository;
    let shortURLEquivalenceBuilder : ShortURLEquivalenceBuilder;
    let eventService : EventService;
    
    beforeAll(async () => {
        applicationTestingModule = await generateTestingModule(URLShortenerModule);
        useCase = applicationTestingModule.resolve(CreateShortURLEquivalenceAsUserUseCase);
        shortURLEquivalenceRepository = applicationTestingModule.resolve(ShortURLEquivalenceRepository);
        shortURLEquivalenceBuilder = applicationTestingModule.resolve(ShortURLEquivalenceBuilder);
        eventService = applicationTestingModule.resolve(EventService);
    });

    beforeEach(async () => { 
        await applicationTestingModule.reset();
    });

    
    describe("create short url equivalence without providing the UUID", () => {
        
        it("returns the short url", async () => {

            const createShortURLEquivalenceAsUser = await transformAndValidate(
                CreateShortURLEquivalenceAsUser,
                {
                    full: "www.test-url.com",
                }
            );

            const result = await useCase.perform({
                createShortURLEquivalenceAsUser, 
            });

            expectInstanceOf(result, CreateShortURLEquivalenceResponse);
                        
            expect(isValidURL(result.url)).toBeTruthy();

        });

        it("returns a DuplicatedURLError if exists another record with the same url ", async () => {

            const url = "www.test-url.com";

            await shortURLEquivalenceBuilder.generate({
                url,
            });

            const createShortURLEquivalenceAsUser = await transformAndValidate(
                CreateShortURLEquivalenceAsUser,
                {
                    full: url,
                }
            );

            const result = await useCase.perform({
                createShortURLEquivalenceAsUser, 
            });

            expectInstanceOf(result, DuplicatedURLError);

        });

    });

    describe("create short url equivalence providing the shortUUID", () => {
        
        it("returns the short url", async () => {

            const shortUUID = "o4X1aXzRDy";

            const createShortURLEquivalenceAsUser = await transformAndValidate(
                CreateShortURLEquivalenceAsUser,
                {
                    full  : "www.test-url.com",
                    short : shortUUID,
                }
            );

            const result = await useCase.perform({
                createShortURLEquivalenceAsUser, 
            });

            expectInstanceOf(result, CreateShortURLEquivalenceResponse);
            
            expect(result.url).toContain(shortUUID);
        });


        it("stores correctly the information in the database", async () => {
            
            const createShortURLEquivalenceInformation = {
                full  : "www.test-url.com",
                short : "test",
            };

            const createShortURLEquivalenceAsUser = await transformAndValidate(
                CreateShortURLEquivalenceAsUser,
                createShortURLEquivalenceInformation
            );

            const result = await useCase.perform({
                createShortURLEquivalenceAsUser, 
            });

            expectInstanceOf(result, CreateShortURLEquivalenceResponse);
     
            const shortURLEquivalence = await shortURLEquivalenceRepository.findByURL(
                createShortURLEquivalenceAsUser.full
            );
            
            expect(shortURLEquivalence).toMatchObject({
                url       : createShortURLEquivalenceAsUser.full,
                shortUUID : createShortURLEquivalenceAsUser.short,
            });
        });

        it("publishes a NewShortURLEquivalenceEvent after creates a new ShortURLEquivalence", async () => {

            let eventReceived : NewShortURLEquivalenceEvent | undefined = undefined;

            eventService.subscribe(NewShortURLEquivalenceEvent, event => eventReceived = event);

            const createShortURLEquivalenceInformation = {
                full  : "www.test-url.com",
                short : "test",
            };

            const createShortURLEquivalenceAsUser = await transformAndValidate(
                CreateShortURLEquivalenceAsUser,
                createShortURLEquivalenceInformation
            );

            await useCase.perform({
                createShortURLEquivalenceAsUser, 
            });

            await retryUntil(() => !!eventReceived);

            expect(eventReceived).toBeInstanceOf(NewShortURLEquivalenceEvent);
        });

        it("returns a DuplicatedShortURLError if exists another record with the same shortUUID ", async () => {

            const shortUUID = "o4X1aXzRDy";
            
            await shortURLEquivalenceBuilder.generate({
                shortUUID,
            });

            const createShortURLEquivalenceAsUser = await transformAndValidate(
                CreateShortURLEquivalenceAsUser,
                {
                    full  : "www.another-test-url.com",
                    short : shortUUID,
                }
            );

            const result = await useCase.perform({
                createShortURLEquivalenceAsUser, 
            });

            expectInstanceOf(result, DuplicatedShortUUIDError);            
        });

    });
});
