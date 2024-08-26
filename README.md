# Drift expo app

Barebone example to load `@drift-labs/sdk` into a React native project (Expo)
## Running app

Install dependencies and start expo

```sh
yarn && yarn start
# Press `i` to run in Simulator
```

## Dependencies using Node standard libraries

References to node standard library modules will case issue during build time. It can be fixed via packages mapping along with `npm:` prefix

You can find compatiable node standard libraries for browser [here](https://github.com/parshap/node-libs-react-native)

### Polyfill through npm packages

Following example will allow 
```json
{
   "process": "npm:shtylman/node-process",
   "os": "npm:os-browserify",
   "path": "npm:path-browserify",
}
```
## Issue with unable to subscribe to Account via Drift client

Caused by how `@solana/web3.js` decide to use `Buffer` class to create the RPC response, which is a method that is missing in React native, here is the [solution](https://github.com/coral-xyz/anchor/issues/3041)