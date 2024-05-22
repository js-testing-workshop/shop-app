#!/usr/bin/env zx

await $`cd ${__dirname}/common && npm install && npm run build && npm link`;

await Promise.all([
  $`cd ${__dirname}/auth && npm install && npm link common`,
  $`cd ${__dirname}/api-gateway && npm install && npm link common`,
  $`cd ${__dirname}/payments && npm install && npm link common`,
  $`cd ${__dirname}/shop && npm install && npm link common`,
]);
