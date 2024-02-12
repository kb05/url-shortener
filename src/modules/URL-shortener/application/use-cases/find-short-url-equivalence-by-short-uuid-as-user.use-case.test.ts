import { ApplicationTestingModule, } from "@src/framework/tests/application-testing-module";
import { expectInstanceOf, } from "@src/framework/tests/expect-instance-of";
import { generateTestingModule, } from "@src/framework/tests/generate-testing-module";

import {
    isValidURL, 
} from "@src/framework/validators/is-valid-url.validator";
import {
    FindShortURLEquivalenceAsUserUseCase,
} from "@src/modules/URL-shortener/application/use-cases/find-short-url-equivalence-by-short-uuid-as-user.use-case";
import { ShortUUIDURLEquivalenceNotFoundError, } from "@src/modules/URL-shortener/domain/errors/short-uuid-url-equivalence.not-found.error";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { ShortURLEquivalenceBuilder, } from "@src/modules/URL-shortener/infrastructure/tests/short-url-equivalence.builder";
import { URLShortenerModule, } from "@src/modules/URL-shortener/URL-shortener.module";


describe("CreateShortURLEquivalenceAsUserUseCase", () => {
    let applicationTestingModule : ApplicationTestingModule;

    let useCase : FindShortURLEquivalenceAsUserUseCase;
    let shortURLEquivalenceBuilder : ShortURLEquivalenceBuilder;
    
    beforeAll(async () => {
        applicationTestingModule = await generateTestingModule(URLShortenerModule);
        useCase = applicationTestingModule.resolve(FindShortURLEquivalenceAsUserUseCase);
        shortURLEquivalenceBuilder = applicationTestingModule.resolve(ShortURLEquivalenceBuilder);
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
