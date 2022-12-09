import path from "path";
import {readFileSync} from "fs";
import * as ReactDOMServer from "react-dom/server";
import type winston from "winston";
import type Express from "express";
import App from "@RideSaver/web";
import React from "react";
import { AppRegistry } from "react-native-web";
import { ServerContainer, ServerContainerRef } from "@react-navigation/native";
import htmlTemplateFile from "@RideSaver/web/build/index.html";

AppRegistry.registerComponent("RideSaver", () => App);

const htmlTemplate = readFileSync(path.resolve(__dirname, htmlTemplateFile));

export default (logger: winston.Logger) =>
    (req: Express.Request, res: Express.Response) => {
        logger.debug(`Rendering ${req.originalUrl}`);
        const { getStyleElement } = AppRegistry.getApplication("RideSaver");
        const ref = React.createRef<ServerContainerRef>();
        const htmlTimer = logger.startTimer();
        global.window = {
            location: {
                host: req.hostname
            } as unknown as Location
        } as unknown as Window & typeof globalThis;
        const root = ReactDOMServer.renderToString(
            <ServerContainer
                ref={ref}
                location={{
                    pathname: req.path,
                    search: new URL("https://" + req.hostname + req.url).search,
                }}
            >
                <App />
            </ServerContainer>
        );
        htmlTimer.done({
            message: `Finished Rendering HTML`,
        });
        const cssTimer = logger.startTimer();
        const css = ReactDOMServer.renderToStaticMarkup(getStyleElement());
        cssTimer.done({
            message: "Finished rendering CSS",
        });
        
        const options = ref.current.getCurrentOptions();
        const html = htmlTemplate.toString().replace(
            '<div id="root"></div>',
            `<div id="root">${root}</div>${css}`
        );

        if(options.errorCode) {
            res.statusCode = options.errorCode;
        }

        res.send(html);
    };
