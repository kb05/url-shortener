#!/bin/sh
set -e

yarn install

yarn prisma generate

# yarn migration:run

# yarn seed

yarn start:debug
