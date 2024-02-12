#!/bin/sh
set -e

yarn install

yarn prisma generate

yarn prisma migrate deploy

yarn seed || true

yarn start:debug
