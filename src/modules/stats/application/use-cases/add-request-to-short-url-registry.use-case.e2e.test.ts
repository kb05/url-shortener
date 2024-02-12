import { ApplicationTestingModule, } from "@src/framework/tests/application-testing-module";
import { expectInstanceOf, } from "@src/framework/tests/expect-instance-of";
import { generateTestingModule, } from "@src/framework/tests/generate-testing-module";
import { AddRequestToShortURLRegistryUseCase, } from "@src/modules/stats/application/use-cases/add-request-to-short-url-registry.use-case";
import {
    ShortURLRegistryOfShortURLEquivalenceNotFoundError,
} from "@src/modules/stats/domain/errors/short-url-registry-of-short-url-equivalence.not-found.error";
import { ShortURLRegistry, } from "@src/modules/stats/domain/models/short-url-registry.model";
import { ShortURLRegistryRepository, } from "@src/modules/stats/domain/repositories/short-url-registry.repository";
import { ShortURLRegistryBuilder, } from "@src/modules/stats/infrastructure/tests/short-url-registry.builder";
import { StatsModule, } from "@src/modules/stats/stats.module";

import { ShortURLEquivalenceBuilder, } from "@src/modules/URL-shortener/infrastructure/tests/short-url-equivalence.builder";


describe("AddRequestToShortURLRegistryUseCase", () => {
    let applicationTestingModule : ApplicationTestingModule;

    let useCase : AddRequestToShortURLRegistryUseCase;
    let shortURLEquivalenceBuilder : ShortURLEquivalenceBuilder;
    let URLRegistryBuilder : ShortURLRegistryBuilder;
    let URLRegistryRepository : ShortURLRegistryRepository;

    beforeAll(async () => {
        applicationTestingModule = await generateTestingModule(StatsModule);
        useCase = applicationTestingModule.resolve(AddRequestToShortURLRegistryUseCase);
        shortURLEquivalenceBuilder = applicationTestingModule.resolve(ShortURLEquivalenceBuilder);
        URLRegistryBuilder = applicationTestingModule.resolve(ShortURLRegistryBuilder);
        URLRegistryRepository = await applicationTestingModule.resolve(ShortURLRegistryRepository);
    });

    beforeEach(async () => { 
        await applicationTestingModule.reset();
    });
    
        
    it("increments the the short url stats if the related shortURLEquivalence exists", async () => {

        const shortURLEquivalence = await shortURLEquivalenceBuilder.generate();
        const URLRegistry = await URLRegistryBuilder.generate({
            numberOfRequests      : 0,
            shortURLEquivalenceId : shortURLEquivalence.id,
        });

        await useCase.perform({
            shortURLEquivalenceId: shortURLEquivalence.id, 
        });


        const storedURLStats = await URLRegistryRepository.findByShortURLEquivalenceId(shortURLEquivalence.id);

        expectInstanceOf(storedURLStats, ShortURLRegistry);

        expect(storedURLStats.numberOfRequests).toBe(URLRegistry.numberOfRequests + 1);
    });

    it("does not increment the stats if the related shortURLEquivalence does not exist", async () => {

        const NOT_FOUND_SHORT_EQUIVALENCE_ID = 9999;

        const result = await useCase.perform({
            shortURLEquivalenceId: NOT_FOUND_SHORT_EQUIVALENCE_ID, 
        });

        expectInstanceOf(result, ShortURLRegistryOfShortURLEquivalenceNotFoundError);
    });

});
