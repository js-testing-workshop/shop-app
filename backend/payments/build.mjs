#!/usr/bin/env zx

// first step: build typescript
await $`rimraf ${__dirname}/build`;
await $`tsc -p prod.tsconfig.json`;

// second step: copy files
await Promise.all([
  $`cp -v ${__dirname}/.prod.env ${__dirname}/build/.env`,
  $`cp -v ${__dirname}/package.json ${__dirname}/package-lock.json ${__dirname}/build`,
]);

// third step: modify package.json
await $`cd ${__dirname}/build && npm pkg delete scripts && npm pkg set scripts.start='node -r dotenv/config index.js'`;
