# Default: Last LTS Node version
ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}

RUN yarn set version stable

WORKDIR /usr/src/project

CMD ["/entrypoint.sh"]
