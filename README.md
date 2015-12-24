# isoreact

isoreact is an isomorphic react webpack boilerplate that features
an awesome dev environment with hot-reload, a lean dependency tree and the ability to quickly start your own projects.

I've mainly created this for myself, to bootstrap my own applications (so it
is somewhat opinionated), but I try to stay as lean as possible with my
dependency choices, so everyone can easily plug-in their own favorite libraries instead of mine.

## Directory Structure

```bash
.
├── src
│   ├── client # code that only lives on the client
│   │   └── index.jsx # renders the react app and has some dev stuff
│   ├── lib # contains things that are shared between the client and the server
│   │   ├── actions # redux actions
│   │   ├── constants # redux constants
│   │   ├── reducers # redux reducers
│   │   ├── stores # redux store configuration
│   │   ├── utils # utils (e.g. WebAPIUtil)
│   │   └── routes.jsx # self-explanatory
│   ├── server # server side stuff
│   │   ├── middlewares # middlewares for express (you may want to add your api endpoints here)
│   │   └── index.js # starts the express server
│   └── views
│       ├── defaults # contains all the views, e.g. the frontpage
│       ├── handler.jsx # root handler that renders all components
│       └── index.jsx # renders the <html> page on the server
├── webpack
│   ├── index.js # used by webpack-dev-server to serve the client and server when developing
│   ├── webpack.client.config.js # client-side webpack configuration
│   ├── webpack.config.js # shared webpack configuration between server and client
│   └── webpack.server.config.js # server-side webpack configuration
├── README.md
├── config.js # holds environment variables and some basic configurations like the host, port etc. used by express or webpack-dev-server
├── index.js # starts the production server (you need to run `npm run build` first)
├── package.json
└── paths.js # build paths for webpack but also for the entire app
```

## Development Architecture

* `webpack-dev-server` serves the client lib with hot-reload enabled
* `webpack` watches src/server for changes and compiles to `_tmp/server/`
* `supervisor` watches `_tmp/server/` for server builds and restarts when a change happens.

## Get started

Install dependencies

```shell
$ npm i
```

Then start development with

```shell
$ npm run dev
```

## Production Build

Compile build files with

```shell
$ npm run build
```

Then run production server with

```shell
$ npm start
```
