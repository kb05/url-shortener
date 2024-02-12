import {
    Controller, 
} from "@nestjs/common";
import { APIController, } from "@src/framework/clean-architecture/adapters/controllers/API-controller.class";


@Controller("stats")
export class ShortURLStatsController implements APIController<ShortURLStatsController> {

}
