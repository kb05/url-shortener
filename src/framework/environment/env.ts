/* eslint-disable @typescript-eslint/no-var-requires */
import path from "path";
import { transformUnknownAndValidateSync, } from "@src/framework/validators/class-validator-transform";
import { Environment, } from "./environment.class";

let envContent : unknown = undefined;

if (process.env.NODE_ENV === "test") {
    envContent = require(path.join(__dirname, "../../../.test-env.json"));

} else {
    envContent = require(path.join(__dirname, "../../../.env.json"));
}

export const env = transformUnknownAndValidateSync(Environment, envContent);
