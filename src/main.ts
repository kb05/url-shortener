import { NestFactory, } from "@nestjs/core";

import { configureSwagger, } from "@src/framework/documentation/configure-swagger";
import { AppModule, } from "./modules/URL-shortener/app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    configureSwagger(app);

    await app.listen(4000);

}
bootstrap();
