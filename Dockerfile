FROM node:lts AS builder

# Copy all dependency files
COPY ./*/package.json /build/
COPY ./*/yarn.lock /build/

# Install dependencies
WORKDIR /build
RUN yarn --frozen-lockfile

# Copy all source files
COPY . /build

# Build the webserver
WORKDIR /build/packages/server
RUN yarn build

##### PRODUCTION IMAGE #####
FROM node-18.12.1:alpine

# Copy all dependency files
COPY ./packages/server/package.json /server/package.json
COPY ./packages/server/yarn.lock /server/package.json

# Install dependencies
WORKDIR /server

# Copy built server
COPY --from=builder /build/package/server/build /server/build

# Setup entrypoint, etc.
ENTRYPOINT /server/build/cli.js
