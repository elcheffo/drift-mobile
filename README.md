# Drift expo app

Until polyfill of Node standard libraries is fixed, please use disk reference to Drift SDK, due to manual editing is required to dependencies to make sdk compatible to React native.

```json
{
   "dependencies": {
      "@drift-labs/sdk": "file:/Users/USER_NAME/drift/protocol-v2/sdk",
   }
}
```

## Running app

Install dependencies and start expo

```sh
yarn && yarn start
# Press `i` to run in Simulator
```

## Dependencies using Node standard libraries

References to node standard library modules will case issue during build time. As a short term workaround, you will need to comment out implementation uses these stand libraries.

(Most of the time is related to loading keypair via disk file, reference to process env or crypto library)

Any package installation will require comment out these implementations again.

### Fs

- `node_modules/@drift-labs/sdk/node_modules/@project-serum/anchor/dist/cjs/workspace.js`

### Process

- `node_modules/@drift-labs/sdk/node_modules/@project-serum/anchor/dist/cjs/provider.js`
- `node_modules/@drift-labs/sdk/node_modules/@openbook-dex/openbook-v2/node_modules/@coral-xyz/anchor/dist/cjs/nodewallet.js`

### Crypto

- `node_modules/@solana/spl-type-length-value/lib/cjs/splDiscriminate.js`