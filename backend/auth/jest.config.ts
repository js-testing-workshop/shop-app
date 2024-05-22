import type { Config } from "jest";

const config: Config = {
  verbose: true,
  displayName: "auth",
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest-setup-files-after-env.ts"],
};

export default config;
