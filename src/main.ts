import { ValidationPipe, } from "@nestjs/common";
import { NestFactory, } from "@nestjs/core";
import { AppModule, } from "@src/app.module";
import { configureSwagger, } from "@src/framework/documentation/configure-swagger";
import { env, } from "@src/framework/environment/env";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("api");

    app.useGlobalPipes(new ValidationPipe({
        transform: true, 
    }));
    
    configureSwagger(app);

    await app.listen(env.port);
}


// Load the environment context
env;

// Startup the application
bootstrap();
