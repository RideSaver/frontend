FROM node:lts AS builder

# Install dependencies
WORKDIR /build

# Copy all source files
COPY . /build
RUN yarn

# Build the webserver
WORKDIR /build/packages/server
RUN yarn build

##### PRODUCTION IMAGE #####
FROM node:18.12.1-alpine

# Install dependencies
WORKDIR /server

# Copy built server
COPY --from=builder /build/package/server/build /server/build

# Setup entrypoint, etc.
ENTRYPOINT /server/build/cli.js
