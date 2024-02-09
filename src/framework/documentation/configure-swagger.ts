import { INestApplication, } from "@nestjs/common";
import {
    DocumentBuilder, SwaggerModule,
} from "@nestjs/swagger";

export function configureSwagger(app : INestApplication) {

    const config = new DocumentBuilder()
        .setTitle("URL Shortener")
        .setDescription("The URL shortener description")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api-docs", app, document);

}
