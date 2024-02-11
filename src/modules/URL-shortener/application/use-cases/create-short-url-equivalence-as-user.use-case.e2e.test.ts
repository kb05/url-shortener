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
import { CreateShortURLEquivalenceAsUser, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence-as-user.model";

import { CreateShortURLEquivalenceResponse, } from "@src/modules/URL-shortener/domain/models/created-short-url-equivalence-response.model";

import { ShortURLEquivalenceRepository, } from "@src/modules/URL-shortener/domain/repositories/short-url-equivalence.repository";

import { ShortURLEquivalenceBuilder, } from "@src/modules/URL-shortener/infrastructure/tests/short-url-equivalence.builder";
import { URLShortenerModule, } from "@src/modules/URL-shortener/URL-shortener.module";


describe("CreateShortURLEquivalenceAsUserUseCase", () => {
    let applicationTestingModule : ApplicationTestingModule;

    let useCase : CreateShortURLEquivalenceAsUserUseCase;
    let shortURLEquivalenceRepository : ShortURLEquivalenceRepository;
    let shortURLEquivalenceBuilder : ShortURLEquivalenceBuilder;
    
    beforeAll(async () => {
        applicationTestingModule = await generateTestingModule(URLShortenerModule);
        useCase = applicationTestingModule.resolve(CreateShortURLEquivalenceAsUserUseCase);
        shortURLEquivalenceRepository = applicationTestingModule.resolve(ShortURLEquivalenceRepository);
        shortURLEquivalenceBuilder = applicationTestingModule.resolve(ShortURLEquivalenceBuilder);
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
            
            console.log(result.url);
            
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
