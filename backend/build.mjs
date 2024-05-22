#!/usr/bin/env zx

await $`rm -rf build`;
await $`mkdir -p build`;
// await $`find . -maxdepth 2 -mindepth 2 -name package.json -execdir npm run build \\;`;

// NOTE: build common module first
await $`cd ${__dirname}/common && npm run build`;

await Promise.all([
  $`cd ${__dirname}/auth && npm run build`,
  $`cd ${__dirname}/api-gateway && npm run build`,
  $`cd ${__dirname}/payments && npm run build`,
  $`cd ${__dirname}/shop && npm run build`,
]);

await Promise.all([
  $`cp -v ${__dirname}/ecosystem.config.js ${__dirname}/build`,
  $`cp -v ${__dirname}/package.json ${__dirname}/package-lock.json ${__dirname}/build`,
]);

await $`cd ${__dirname}/build && npm pkg delete scripts && npm pkg set scripts.start='pm2 start ecosystem.config.js' && npm i --omit=dev`;

cd(`${__dirname}`);

// NOTE: copoy common module as is
await $`cp -vr ${__dirname}/common ${__dirname}/build/common`;

const modules = ["auth", "shop", "payments", "api-gateway"];

for (const module of modules) {
  await $`cp -vr ${__dirname}/${module}/build ${__dirname}/build/${module}`;
  cd(`${__dirname}/build/${module}`);
  await $`npm ci --omit=dev`;
  cd("../..");
}
