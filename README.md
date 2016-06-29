# ![unireact](http://martinbroder.com/unireact-logo.svg)

[![Build Status](https://travis-ci.org/mrtnbroder/isomorphic-react-webpack-boilerplate.svg?branch=master)](https://travis-ci.org/mrtnbroder/isomorphic-react-webpack-boilerplate)
![dependency badge](https://david-dm.org/mrtnbroder/universal-react-webpack-boilerplate.svg)
[![devDependency Status](https://david-dm.org/mrtnbroder/universal-react-webpack-boilerplate/dev-status.svg)](https://david-dm.org/mrtnbroder/universal-react-webpack-boilerplate#info=devDependencies)

unireact is an universal react boilerplate that features
an awesome dev environment with hot-reload, a lean dependency tree and the
ability to quickly bootstrap your own applications.

## Table of Contents
* [Get Started](#get-started)
  * [Production Build](#production-build)
  * [Development Flow](#development-flow)
* [Dependencies](#dependencies)
* [Features](#features)
  * [Hot Reload](#hot-reload)
  * [Babel](#babel)
* [Ecosystem](#ecosystem)
  * [Directory Structure](#directory-structure)
  * [Component Structure](#component-structure)
* [Credits](#credits)

## Get started

Install dependencies

```shell
$ npm i
```

Then start development with

```shell
$ npm run dev
```

### Production Build

Build the production version with

```shell
$ npm run build
```

Then run the production server with

```shell
$ npm start
```

### Development Flow

* `webpack-dev-server` serves the client lib with hot-reload enabled
* `webpack` watches src/server for changes and compiles to `_tmp/server/`
* `nodemon` watches for server rebuilds and automatically restarts when a change happened.

#### Hot Reloading

Please note that hot reloading only works when your top-level component is
a react class component. Hot reloading of stateless components at the top
doesn't work yet as react-hmr is not able to figure out if your function
returns a react element.

## Dependencies

unireact is depending several libraries to handle things like async actions, routing, state management etc. Please get to each of them first when you have questions about how to work with them.

* [express](https://github.com/strongloop/express/)
* [react](https://github.com/facebook/react)
* [react-redux](https://github.com/rackt/react-redux) (redux bindings for react)
* [react-router](https://github.com/rackt/react-router)
* [redux](https://github.com/rackt/redux/) (predictable state container)
* [redux-actions](https://github.com/acdlite/redux-actions) (human friendly standard for flux actions)
* [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware) (handle promises for optimistic updates)
* [redux-thunk](https://github.com/gaearon/redux-thunk) (allow async actions)

## Features

### Hot Reload

Speed up your development workflow with [webpack](webpack.github.io)'s awesome [Hot Module System](https://webpack.github.io/docs/hot-module-replacement.html). Using [babel-transform-hmr](https://github.com/gaearon/react-transform-hmr)
you can write your react components and have them updated in an instant without the need to reload your page.

(Note: stateless react components require a full page-reload. webpack takes care of that though.)

### ES2015/16 with Babel

You can start writing ES 2015/16 within the src directory, as everything in there will be transpiled with [babel](https://babeljs.io/). Currently included is the preset for [es2015](https://babeljs.io/docs/plugins/preset-es2015/) (allows jsx syntax) and [stage-0](https://babeljs.io/docs/plugins/preset-stage-0/) (async/await).

## Ecosystem

### Directory Structure

```bash
.
├── config
│   ├── config.js           # holds environment variables and some basic configurations like the host, port etc. used by express or webpack-dev-server
│   └── paths.js            # build paths for webpack but also for the entire app
├── src
│   ├── client              # code that only lives on the client
│   │   └── index.jsx       # renders the react app and has some dev stuff
│   ├── shared              # shared code between the client and the server
│   │   ├── actions         # redux actions
│   │   ├── constants       # redux constants
│   │   ├── reducers        # redux reducers
│   │   ├── stores          # redux store configuration
│   │   ├── utils           # utils (e.g. WebAPIUtil)
│   │   └── routes          # view routes (server + client router)
│   ├── server              # server side stuff
│   │   ├── middlewares     # middlewares for express (you may want to add your api endpoints here)
│   │   └── index.js        # starts the express server
│   └── views               # contains all the views, e.g. the frontpage
│       ├── root.jsx        # root handler that renders all children
│       └── html.jsx        # renders the <html> page on the server
├── webpack
│   ├── index.js                    # used by webpack-dev-server to serve the client and server when developing
│   ├── webpack.client.config.js    # client-side webpack configuration
│   ├── webpack.config.js           # shared webpack configuration between server and client
│   └── webpack.server.config.js    # server-side webpack configuration
├── README.md
├── index.js      # starts the production server (you need to run `npm run build` first)
├── package.json
```

### Component Structure

To make components shareable and contained, components that need to expose
their state within a reducer should follow this structure:

```bash
├── components # pure components *only*
│   ├── image.jsx # pure component that renders the product image
│   ├── price.jsx # pure component that renders the product price
│   └── product.jsx # pure component that renders the product page
├── actions
│   ├── productActions.js # actions only used within this directory
├── constants
│   ├── productConstants.js # constants only used within this directory
├── reducers
│   ├── index.js # exports all reducers within this directory, so we can easily import it by our root reducer
│   └── products.js # reducer only used by products.jsx
└── products.jsx # this is our container component that imports from components
```

When following this structure, you makes things easier to reason about and your component stays contained. It will only ever reach out to whats inside this directory and not touch anything else.

When other components need to interact with your local state, you should move your actions and reducers one level up (until they reach the top level lib directory).

### Credits

Thanks go out to [kriasoft](https://github.com/kriasoft) and the team of [este](https://github.com/este/este) as I took some inspiration from these awesome guys!
