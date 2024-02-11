import { Test, } from "@nestjs/testing";
import {
    CreateShortURLEquivalenceAsUserUseCase,
} from "@src/modules/URL-shortener/application/use-cases/create-short-url-equivalence-as-user.use-case";
import { URLShortenerModule, } from "@src/modules/URL-shortener/URL-shortener.module";

describe("CreateShortURLEquivalenceAsUserUseCase", () => {
    let useCase : CreateShortURLEquivalenceAsUserUseCase;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [URLShortenerModule,],
        }).compile();

        useCase = moduleRef.get(CreateShortURLEquivalenceAsUserUseCase);
    });

    describe("create short url equivalence without providing the uuid", () => {
        it("should return an array of cats", async () => {

            console.log("test");
        });
    });
});
