import type { Config } from "jest";

const config: Config = {
  verbose: true,
  projects: [
    "<rootDir>/shop",
    "<rootDir>/payments",
    "<rootDir>/auth",
    "<rootDir>/common",
  ],
  testPathIgnorePatterns: ["<rootDir>/build"],
};

export default config;
