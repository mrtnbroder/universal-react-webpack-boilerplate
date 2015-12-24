# isoreact

isoreact is an isomorphic react webpack boilerplate that features
an awesome dev environment with hot-reload, a lean dependency tree and the ability to quickly start your own projects.

I've mainly created this for myself, to bootstrap my own applications (so it
is somewhat opinionated), but I try to stay as lean as possible with my
dependency choices, so everyone can easily plug-in their own favorite libraries instead of mine.

## Table of Contents
* [Get started](#get-started)
  * [Production build](#production-build)
  * [Development Architecture](#development-architecture)
* [Directory Structure](#directory-structure)
  * [Component Structure](#component-structure)

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

Compile build files with

```shell
$ npm run build
```

Then run production server with

```shell
$ npm start
```

### Development Architecture

* `webpack-dev-server` serves the client lib with hot-reload enabled
* `webpack` watches src/server for changes and compiles to `_tmp/server/`
* `supervisor` watches `_tmp/server/` for server builds and restarts when a change happens.


## Directory Structure

```bash
.
├── src
│   ├── client      # code that only lives on the client
│   │   └── index.jsx       # renders the react app and has some dev stuff
│   ├── lib         # contains things that are shared between the client and the server
│   │   ├── actions         # redux actions
│   │   ├── constants       # redux constants
│   │   ├── reducers        # redux reducers
│   │   ├── stores          # redux store configuration
│   │   ├── utils           # utils (e.g. WebAPIUtil)
│   │   └── routes.jsx      # self-explanatory
│   ├── server      # server side stuff
│   │   ├── middlewares     # middlewares for express (you may want to add your api endpoints here)
│   │   └── index.js        # starts the express server
│   └── views
│       ├── defaults        # contains all the views, e.g. the frontpage
│       ├── handler.jsx     # root handler that renders all components
│       └── index.jsx       # renders the <html> page on the server
├── webpack
│   ├── index.js                    # used by webpack-dev-server to serve the client and server when developing
│   ├── webpack.client.config.js    # client-side webpack configuration
│   ├── webpack.config.js           # shared webpack configuration between server and client
│   └── webpack.server.config.js    # server-side webpack configuration
├── README.md
├── config.js     # holds environment variables and some basic configurations like the host, port etc. used by express or webpack-dev-server
├── index.js      # starts the production server (you need to run `npm run build` first)
├── package.json
└── paths.js      # build paths for webpack but also for the entire app
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
