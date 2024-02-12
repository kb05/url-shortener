import { Injectable, } from "@nestjs/common";

import { transformAndValidate, } from "@src/framework/validators/class-validator-transform";
import { ShortURLRegistryBuilder, } from "@src/modules/stats/infrastructure/tests/short-url-registry.builder";
import { ShortUrlEquivalenceService, } from "@src/modules/URL-shortener/application/services/short-url-equivalence.service";
import { ShortURLEquivalencePaginationInput, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence-pagination-input.model";

import { ShortURLEquivalenceBuilder, } from "@src/modules/URL-shortener/infrastructure/tests/short-url-equivalence.builder";
import { URLEquivalencesExamples, } from "@src/seeders/data/url-equivalences";


const NUMBER_OF_SHORT_URL_EQUIVALENCES = 30;

// ? This is a simple seeder, but instead use prisma the idea is abstract the seeder from the database
// ? we could improve it to execute seeds iterative.
@Injectable()
export class SeederService  {
   
    
    constructor(
        private readonly shortURLEquivalenceBuilder : ShortURLEquivalenceBuilder,
        private readonly shortURLRegistryBuilder : ShortURLRegistryBuilder,
        private readonly shortUrlEquivalenceService : ShortUrlEquivalenceService,
    ) { }
    
    public async seedEnvironment() {
        
        const shortURLEquivalences = await Promise.all(
            URLEquivalencesExamples.map(url => this.shortURLEquivalenceBuilder.generate({
                url,
            }))
        );
      
        const shortURLRegistries = await Promise.all(
            shortURLEquivalences.map(
                shortURLEquivalence => this.shortURLRegistryBuilder.generate({
                    shortURLEquivalenceId: shortURLEquivalence.id, 
                })
            )
        ); 
        
    }

    public async isEnvironmentAlreadySeed() : Promise<boolean>{
        const paginationResults = await this.shortUrlEquivalenceService.findByPaginated(
            await transformAndValidate(ShortURLEquivalencePaginationInput, {
                page  : 1,
                limit : 1,
            })
        );
      
        return paginationResults.total > 0;
    }

 
}
