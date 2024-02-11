import { ApplicationTestingModule, } from "@src/framework/tests/application-testing-module";
import { generateTestingModule, } from "@src/framework/tests/generate-testing-module";
import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import {
    CreateShortURLEquivalenceAsUserUseCase,
} from "@src/modules/URL-shortener/application/use-cases/create-short-url-equivalence-as-user.use-case";
import { CreateShortURLEquivalenceAsUser, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence-as-user.model";

import { ShortURLEquivalenceRepository, } from "@src/modules/URL-shortener/domain/repositories/short-url-equivalence.repository";
import { URLShortenerModule, } from "@src/modules/URL-shortener/URL-shortener.module";


describe("CreateShortURLEquivalenceAsUserUseCase", () => {
    let applicationTestingModule : ApplicationTestingModule;

    let useCase : CreateShortURLEquivalenceAsUserUseCase;
    let shortURLEquivalenceRepository : ShortURLEquivalenceRepository;

    beforeAll(async () => {
        applicationTestingModule = await generateTestingModule(URLShortenerModule);
        useCase = applicationTestingModule.resolve(CreateShortURLEquivalenceAsUserUseCase);
        shortURLEquivalenceRepository = applicationTestingModule.resolve(ShortURLEquivalenceRepository);
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
    
            
        });
    });
});
