import { Injectable, } from "@nestjs/common";
import { generateCrudService, } from "@src/framework/clean-architecture/application/generate-crud-service";
import { ShortUrlEquivalenceNotFoundError, } from "@src/modules/URL-shortener/domain/errors/admin.not-found.error";
import { CreateShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/create-short-url-equivalence.model";
import { ShortURLEquivalence, } from "@src/modules/URL-shortener/domain/models/short-url-equivalence.model";
import { ShortURLEquivalenceRepository, } from "@src/modules/URL-shortener/domain/repositories/admin.repository";


@Injectable()
export class ShortUrlEquivalenceService extends generateCrudService({
    modelClass                  : ShortURLEquivalence,
    createModelInformationClass : CreateShortURLEquivalence,
    notFoundError               : ShortUrlEquivalenceNotFoundError,
    onSaveErrors                : [],
}) { 
    
    protected async verifyModel(model : CreateShortURLEquivalence | ShortURLEquivalence) {
       
        // const adminWithTheSameEmail = await this.findByEmail(model.email);

        // if (!adminWithTheSameEmail) {
        //     return;
        // }

        // if (model instanceof Admin && adminWithTheSameEmail?.id === model?.id) {
        //     return;
        // }
        
        // return transformAndValidate(DuplicatedAdminEmailError, {
        //     email: model.email,
        // });
    
    }

    constructor(
        protected readonly adminRepository : ShortURLEquivalenceRepository,
    ) {
        super(adminRepository);
    }

}
