/* eslint-disable */

// The purpose of this file is use our .env.json file and integrates it with prisma environment

const path = require("path")
const { isString,isObject } = require('class-validator')


function getEnvironmentInformation() {
    return require(path.join(__dirname, "../.env.json"))
}

function validateDatabaseInformation(databaseConnectionInformation) {

    if(!isObject(databaseConnectionInformation)) {
        throw new Error("Database connection information is not an object")
    }

    if (
        !isString(databaseConnectionInformation.user) ||
        !isString(databaseConnectionInformation.password) ||
        !isString(databaseConnectionInformation.host) ||
        !isString(databaseConnectionInformation.database)
    ) {
        throw new Error("Database connection information is not valid")
    }
    
    return databaseConnectionInformation
}


const environmentInformation = getEnvironmentInformation()

const databaseConnectionInformation = environmentInformation['databaseConnection']

validateDatabaseInformation(databaseConnectionInformation)

const { user, password, host, port, database } = databaseConnectionInformation

const databaseURL = `postgresql://${user}:${password}@${host}:${port}/${database}`

process.env.PRISMA_DATABASE_URL = databaseURL
