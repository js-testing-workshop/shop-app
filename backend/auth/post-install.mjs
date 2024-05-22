#!/usr/bin/env zx

await $`cp -n .example.env .env || true && npm run seedUsers`;
