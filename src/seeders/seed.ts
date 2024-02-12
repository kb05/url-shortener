import { generateTestingModule, } from "@src/framework/tests/generate-testing-module";
import { SeederModule, } from "@src/seeders/seeder.module";
import { SeederService, } from "@src/seeders/seeder.service";


// ? This is a simple seeder, but instead use prisma the idea is abstract the seeder from the database
(async () => {
    const app = await generateTestingModule(SeederModule);
  
    const seederService = app.resolve(SeederService);

    if (await seederService.isEnvironmentAlreadySeed()) {
        console.log("Seeder already executed");
        return;
    }
  
    console.log("Executing Seeder");
    await seederService.seedEnvironment();

})().catch(error=>console.error(error)).finally(() => process.exit(0));
