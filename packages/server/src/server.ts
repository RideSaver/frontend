import https from "https";
import http2 from "http2";
import path from "path";
import type yargs from "yargs";
import logger from "./logger";
import express from "express";
import http2Express from "http2-express-bridge";
import expressWinston from "express-winston";
import render from "./render";
import assetManifest from "@RideSaver/web/build/asset-manifest.json";

export interface ServerArgs {
    httpsSocket: string;
    httpSocket: string;
    serverCertificate: string;
    serverKey: string;
    useVault: boolean;
}

export default (options: yargs.ArgumentsCamelCase<ServerArgs>) => {
    logger.debug("Starting server");
    const app = http2Express(express);

    app.use(
        expressWinston.logger({
            winstonInstance: logger,
        })
    );

    app.use(
        express.static(path.resolve(__dirname, "public"), {
            index: false,
        })
    );

    app.use("*", render(logger));

    if (
        options.httpSocket &&
        !!options.serverCertificate &&
        !!options.serverKey
    ) {
        const http2Server = http2.createSecureServer(
            {
                allowHTTP1: true,
                key: options.serverKey,
                cert: options.serverCertificate,
            },
            app
        );
        http2Server.listen(options.httpSocket, () => {
            logger.info(
                `Listening for HTTP traffic on port ${options.httpSocket}`
            );
        });
    } else if (options.httpSocket) {
        app.listen(options.httpSocket, () => {
            logger.info(
                `Listening for HTTP traffic on port ${options.httpSocket}`
            );
        });
    }
    if (options.httpsSocket) {
        const httpsServer = https.createServer(
            {
                key: options.serverKey,
                cert: options.serverCertificate,
            },
            app
        );
        httpsServer.listen(options.httpsSocket, () => {
            logger.info(
                `Listening for HTTPS traffic on port ${options.httpsSocket}`
            );
        });
    }
};
