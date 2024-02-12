import { ApplicationTestingModule, } from "@src/framework/tests/application-testing-module";
import { expectInstanceOf, } from "@src/framework/tests/expect-instance-of";
import { generateTestingModule, } from "@src/framework/tests/generate-testing-module";
import { IncreaseShortURLStatsUseCase, } from "@src/modules/stats/application/use-cases/increase-short-url-stats.use-case";
import {
    ShortURLStatsOfShortURLEquivalenceNotFoundError,
} from "@src/modules/stats/domain/errors/short-url-stats-of-short-url-equivalence.not-found.error";
import { ShortURLStats, } from "@src/modules/stats/domain/models/short-url-stats.model";

import { ShortURLStatsRepository, } from "@src/modules/stats/domain/repositories/short-url-stats.repository";
import { ShortURLStatsBuilder, } from "@src/modules/stats/infrastructure/tests/short-url-equivalence.builder";
import { StatsModule, } from "@src/modules/stats/stats.module";

import { ShortURLEquivalenceBuilder, } from "@src/modules/URL-shortener/infrastructure/tests/short-url-equivalence.builder";


describe("IncreaseShortURLStatsUseCase", () => {
    let applicationTestingModule : ApplicationTestingModule;

    let useCase : IncreaseShortURLStatsUseCase;
    let shortURLEquivalenceBuilder : ShortURLEquivalenceBuilder;
    let shortURLStatsBuilder : ShortURLStatsBuilder;
    let shortURLStatsRepository : ShortURLStatsRepository;

    beforeAll(async () => {
        applicationTestingModule = await generateTestingModule(StatsModule);
        useCase = applicationTestingModule.resolve(IncreaseShortURLStatsUseCase);
        shortURLEquivalenceBuilder = applicationTestingModule.resolve(ShortURLEquivalenceBuilder);
        shortURLStatsBuilder = applicationTestingModule.resolve(ShortURLStatsBuilder);
        shortURLStatsRepository = await applicationTestingModule.resolve(ShortURLStatsRepository);
    });

    beforeEach(async () => { 
        await applicationTestingModule.reset();
    });
    
        
    it("increments the the short url stats if the related shortURLEquivalence exists", async () => {

        const shortURLEquivalence = await shortURLEquivalenceBuilder.generate();
        const shortURLStats = await shortURLStatsBuilder.generate({
            numberOfRequests      : 0,
            shortURLEquivalenceId : shortURLEquivalence.id,
        });

        await useCase.perform({
            shortURLEquivalenceId: shortURLEquivalence.id, 
        });


        const storedURLStats = await shortURLStatsRepository.findByShortURLEquivalenceId(shortURLEquivalence.id);

        expectInstanceOf(storedURLStats, ShortURLStats);

        expect(storedURLStats.numberOfRequests).toBe(shortURLStats.numberOfRequests + 1);
    });

    it("does not increment the stats if the related shortURLEquivalence does not exist", async () => {

        const NOT_FOUND_SHORT_EQUIVALENCE_ID = 9999;

        const result = await useCase.perform({
            shortURLEquivalenceId: NOT_FOUND_SHORT_EQUIVALENCE_ID, 
        });

        expectInstanceOf(result, ShortURLStatsOfShortURLEquivalenceNotFoundError);
    });

});
