/**
 * Render the web based app on the browser. Also supports hydration.
 * @author Elias Schablowski
 * @format
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { I18nProvider } from "@lingui/react";
import { NativeBaseProvider } from "native-base";
import { Provider as ReduxProvider } from "react-redux";
import i18n from "@RideSaver/internationalization";
import { store } from "@RideSaver/store";
/**
 * @brief
 */
const rootNode = document.getElementById("root");
let root: ReactDOM.Root;
const elem = (
    <React.StrictMode>
        <NativeBaseProvider>
            <I18nProvider i18n={i18n}>
                <ReduxProvider store={store}>
                        <App />
                </ReduxProvider>
            </I18nProvider>
        </NativeBaseProvider>
    </React.StrictMode>
);
if (rootNode.childElementCount > 0) {
    root = ReactDOM.hydrateRoot(rootNode, elem);
} else {
    root = ReactDOM.createRoot(document.getElementById("root"));
}
root && root.render(elem);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
