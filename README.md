# Isomorphic React Webpack Boilerplate

Redux

## Development Architecture

`webpack-dev-server` serves the client lib with hot-reload enabled
`webpack` watches src/server for changes and compiles to `_tmp/server/`
`supervisor` watches `_tmp/server/` for server builds and restarts when a change
happens.

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
