
import { ApplicationTestingModule, } from "@src/framework/tests/application-testing-module";
import { expectInstanceOf, } from "@src/framework/tests/expect-instance-of";
import { generateTestingModule, } from "@src/framework/tests/generate-testing-module";


import { CreateShortURLStatsUseCase, } from "@src/modules/stats/application/use-cases/create-short-url-stats.use-case";
import { DuplicatedShortURLStatsError, } from "@src/modules/stats/domain/errors/duplicated-short-url-stats.error";
import { ShortURLStats, } from "@src/modules/stats/domain/models/short-url-stats.model";
import { ShortURLStatsBuilder, } from "@src/modules/stats/infrastructure/tests/short-url-equivalence.builder";
import { StatsModule, } from "@src/modules/stats/stats.module";
import { ShortUrlEquivalenceNotFoundError, } from "@src/modules/URL-shortener/domain/errors/short-url-equivalence.not-found.error";


import { ShortURLEquivalenceBuilder, } from "@src/modules/URL-shortener/infrastructure/tests/short-url-equivalence.builder";


describe("CreateShortURLStatsUseCase", () => {
    let applicationTestingModule : ApplicationTestingModule;

    let useCase : CreateShortURLStatsUseCase;
    let shortURLEquivalenceBuilder : ShortURLEquivalenceBuilder;
    let shortURLStatsBuilder : ShortURLStatsBuilder;
    
    beforeAll(async () => {
        applicationTestingModule = await generateTestingModule(StatsModule);
        useCase = applicationTestingModule.resolve(CreateShortURLStatsUseCase);
        shortURLEquivalenceBuilder = applicationTestingModule.resolve(ShortURLEquivalenceBuilder);
        shortURLStatsBuilder = applicationTestingModule.resolve(ShortURLStatsBuilder);
    });

    beforeEach(async () => { 
        await applicationTestingModule.reset();
    });
    
        
    it("creates the short url stats if the related shortURLEquivalence exists", async () => {

        const shortURLEquivalence = await shortURLEquivalenceBuilder.generate();

        const result = await useCase.perform({
            shortURLEquivalenceId: shortURLEquivalence.id, 
        });

        expectInstanceOf(result, ShortURLStats);
    });

    it("does not creates the short url stats if the related shortURLEquivalence does not exist", async () => {

        const NOT_FOUND_SHORT_EQUIVALENCE_ID = 9999;

        const result = await useCase.perform({
            shortURLEquivalenceId: NOT_FOUND_SHORT_EQUIVALENCE_ID, 
        });

        expectInstanceOf(result, ShortUrlEquivalenceNotFoundError);
    });

    it("does not creates the short url stats if already exists another short url stats related to the same shortURLEquivalence", async () => {

        const shortURLEquivalence = await shortURLEquivalenceBuilder.generate();
        await shortURLStatsBuilder.generate({
            shortURLEquivalenceId: shortURLEquivalence.id,
        });

        const result = await useCase.perform({
            shortURLEquivalenceId: shortURLEquivalence.id, 
        });

        expectInstanceOf(result, DuplicatedShortURLStatsError);
    });

});
