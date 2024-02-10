import {
    Injectable, OnModuleInit, 
} from "@nestjs/common";
import { PrismaClient, } from "@prisma/client";
import { env, } from "@src/framework/environment/env";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    
    onModuleInit() {
        // ? Prisma only allow env vars to initialize the cli, 
        // ? so it's necessary to set the env var in this way :S (if we want to use other env provider methods)
        process.env["PRISMA_DATABASE_URL"] = env.databaseConnection.getDatabaseUrl();
    }
    
}
