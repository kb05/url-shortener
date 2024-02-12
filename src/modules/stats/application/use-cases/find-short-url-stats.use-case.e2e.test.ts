import "jest-extended";
import { ApplicationTestingModule, } from "@src/framework/tests/application-testing-module";
import { expectInstanceOf, } from "@src/framework/tests/expect-instance-of";
import { generateTestingModule, } from "@src/framework/tests/generate-testing-module";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { FindShortURLStatsUseCase, } from "@src/modules/stats/application/use-cases/find-short-url-stats.use-case";
import { CreateShortURLRegistry, } from "@src/modules/stats/domain/models/create-short-url-registry.model";
import { ShortURLStatsPaginationInput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-input.model";
import { ShortURLStatsPaginationOutput, } from "@src/modules/stats/domain/models/short-url-stats-pagination-output.model";
import { ShortURLRegistryBuilder, } from "@src/modules/stats/infrastructure/tests/short-url-registry.builder";
import { StatsModule, } from "@src/modules/stats/stats.module";
import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { ShortURLEquivalenceBuilder, } from "@src/modules/URL-shortener/infrastructure/tests/short-url-equivalence.builder";
import * as matchers from "jest-extended";
import { times, } from "lodash";


expect.extend(matchers);

describe("CreateShortURLRegistryUseCase", () => {
    let applicationTestingModule : ApplicationTestingModule;

    let useCase : FindShortURLStatsUseCase;
    let shortURLEquivalenceBuilder : ShortURLEquivalenceBuilder;
    let shortURLRegistryBuilder : ShortURLRegistryBuilder;
    
    beforeAll(async () => {
        applicationTestingModule = await generateTestingModule(StatsModule);
        useCase = applicationTestingModule.resolve(FindShortURLStatsUseCase);
        shortURLEquivalenceBuilder = applicationTestingModule.resolve(ShortURLEquivalenceBuilder);
        shortURLRegistryBuilder = applicationTestingModule.resolve(ShortURLRegistryBuilder);
    });

    beforeEach(async () => { 
        await applicationTestingModule.reset();
    });

    async function generateShortURLEquivalence({
        shortURLEquivalenceInformation,
        createShortURLRegistryInformation,
    } : {
        shortURLEquivalenceInformation ?: Partial<CreateShortURLEquivalence>,
        createShortURLRegistryInformation ?: Partial<CreateShortURLRegistry>,
    } = {}) {

        const shortURLEquivalence = await shortURLEquivalenceBuilder.generate(shortURLEquivalenceInformation);

        const shortURLRegistry = await shortURLRegistryBuilder.generate({
            shortURLEquivalenceId: shortURLEquivalence.id,
            ...createShortURLRegistryInformation,
        });

        return {
            shortURLEquivalence,
            shortURLRegistry,
        };
    }
    
       
    describe("Short URL stats pagination", () => {
        
        it("return an empty result array if there are no ShortURLStats", async () => {

            // const shortURLEquivalence = await shortURLEquivalenceBuilder.generate();

            const shortURLStatsPaginationInput = await transformAndValidate(ShortURLStatsPaginationInput, {
                page  : 1,
                limit : 100,
            });

            const result = await useCase.perform({
                shortURLStatsPaginationInput, 
            });

            expectInstanceOf(result, ShortURLStatsPaginationOutput);
            expect(result.results).toHaveLength(0);
        });

        it("return the ShortURLStats of the stored registries", async () => {


            const shortURLs = await Promise.all(times(4, () => generateShortURLEquivalence({
                createShortURLRegistryInformation: {
                    numberOfRequests: 0,
                },
            })));

            const shortURLStatsPaginationInput = await transformAndValidate(ShortURLStatsPaginationInput, {
                page  : 1,
                limit : 100,
            });

            const result = await useCase.perform({
                shortURLStatsPaginationInput, 
            });

            expectInstanceOf(result, ShortURLStatsPaginationOutput);
            expect(result.results).toIncludeSameMembers(
                shortURLs.map(shortURL => {
                    return {
                        numberOfRequests : 0,
                        shortUUID        : shortURL.shortURLEquivalence.shortUUID,
                        url              : shortURL.shortURLEquivalence.url,
                        lastAccess       : shortURL.shortURLRegistry.updatedAt,
                    };
                })
            );
        });
      
    });

    describe("Short URL stats filters", () => {

       
        it("filters by the url name ", async () => {

            const expectedShortURL = await generateShortURLEquivalence({
                shortURLEquivalenceInformation: {
                    url: "www.test.com",
                },
            });

            await Promise.all(times(5, () => generateShortURLEquivalence()));

            const shortURLStatsPaginationInput = await transformAndValidate(ShortURLStatsPaginationInput, {
                page  : 1,
                limit : 100,
                url   : expectedShortURL.shortURLEquivalence.url,
            });

            const result = await useCase.perform({
                shortURLStatsPaginationInput, 
            });

            expectInstanceOf(result, ShortURLStatsPaginationOutput);
            expect(result.results).toIncludeSameMembers([{
                numberOfRequests : expectedShortURL.shortURLRegistry.numberOfRequests,
                shortUUID        : expectedShortURL.shortURLEquivalence.shortUUID,
                url              : expectedShortURL.shortURLEquivalence.url,
                lastAccess       : expectedShortURL.shortURLRegistry.updatedAt,
            },]);
        });

           
        it("filters by the url shortUUID ", async () => {

            const expectedShortURL = await generateShortURLEquivalence({
                shortURLEquivalenceInformation: {
                    shortUUID: "test",
                },
            });

            await Promise.all(times(5, () => generateShortURLEquivalence()));

            const shortURLStatsPaginationInput = await transformAndValidate(ShortURLStatsPaginationInput, {
                page      : 1,
                limit     : 100,
                shortUUID : expectedShortURL.shortURLEquivalence.shortUUID,
            });

            const result = await useCase.perform({
                shortURLStatsPaginationInput, 
            });

            expectInstanceOf(result, ShortURLStatsPaginationOutput);
            expect(result.results).toIncludeSameMembers([{
                numberOfRequests : expectedShortURL.shortURLRegistry.numberOfRequests,
                shortUUID        : expectedShortURL.shortURLEquivalence.shortUUID,
                url              : expectedShortURL.shortURLEquivalence.url,
                lastAccess       : expectedShortURL.shortURLRegistry.updatedAt,
            },]);
        });
      
        
    });
   

});
