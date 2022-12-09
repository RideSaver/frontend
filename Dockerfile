FROM node:lts AS builder

# Install dependencies
WORKDIR /build

# Copy all source files
COPY . /build
ARG github_token
RUN echo //npm.pkg.github.com/:_authToken=$github_token >> .npmrc

RUN yarn

# Build the webserver
WORKDIR /build/packages/web
RUN yarn build
# Build the webserver
WORKDIR /build/packages/server
RUN yarn build

##### PRODUCTION IMAGE #####
FROM node:18.12.1-alpine

# Install dependencies
WORKDIR /server

# Copy built server
COPY --from=builder /build/packages/server/build /server/build
RUN chmod agu+x /server/build/cli.js && npm i -g source-map-support

# Setup entrypoint, etc.
ENTRYPOINT /server/build/cli.js serve --httpPort 80
