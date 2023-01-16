# RideSaver Frontend
 > Monorepository for the Web based and app based clients.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
 ## Packages

 ### components

 These are the display components that are shared across the app and web.

 ### store

 This defines the [Redux](https://redux.js.org/) store.

 ### api

 This defines the API interface.

 ### native

 This defines the react-native app, with all screens and native-specific files

 ### web

 This defines the web app, with all screens and native-specific files
 
## Installing (Development)
1. Obtain a [Personal Access Token](https://github.com/settings/tokens) with `package:read` scope
2. Create a `.npmrc` file in your home directory with `//npm.pkg.github.com/:_authToken=<YOUR AUTH TOKEN HERE>`
3. Run `yarn` to install all dependencies

### Using Remote Containers VSCode extension
> You will need [VSCode](https://code.visualstudio.com), [Remote Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers), and [Docker](https://docker.com)
1. Complete steps 1 & 2 from the standard install
2. Open this folder in VSCode
3. Click Open in Containers
4. Run `yarn` to install all dependencies
