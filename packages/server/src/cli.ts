import yargs from "yargs";
import type { ServerArgs } from "./server";
import logger from "./logger";
import winston from "winston";
import fetch from "node-fetch";

global.fetch = fetch as unknown as typeof global.fetch;

const args = await yargs
    .usage("Usage: $0 [command] <options>")
    .config()
    .demandCommand(1)
    .command(
        "serve",
        "Start the webserver",
        (yargs) => {
            return yargs
                .option("httpSocket", {
                    description: "Run as HTTP server",
                    type: "string",
                    default: "8080",
                })
                .option("httpsSocket", {
                    description: "run as HTTP/S server",
                    type: "string",
                    implies: ["serverCertificate", "serverKey"],
                })
                .option("serverCertificate", {
                    type: "string",
                    normalize: true,
                    implies: ["serverKey", "httpsSocket"],
                })
                .option("serverKey", {
                    type: "string",
                    normalize: true,
                    implies: ["serverCertificate", "httpsSocket"],
                }).argv;
        },
        (argv: yargs.ArgumentsCamelCase<ServerArgs>) => {
            import("./server").then(({ default: server }) => server(argv));
        }
    )
    .option("logLevel", {
        choices: ["error", "warn", "info", "http", "verbose", "debug", "silly"],
    }).argv;

logger.add(
    new winston.transports.Console({
        level: args.logLevel,
    })
);
