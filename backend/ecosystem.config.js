const path = require("path");

module.exports = {
  apps: [
    {
      name: "auth",
      script: "npm",
      args: "start",
      cwd: path.resolve(__dirname, "auth/"),
    },
    {
      name: "payments",
      script: "npm",
      args: "start",
      cwd: path.resolve(__dirname, "payments/"),
    },
    {
      name: "shop",
      script: "npm",
      args: "start",
      cwd: path.resolve(__dirname, "shop/"),
    },
    {
      name: "api-gateway",
      script: "npm",
      args: "start",
      cwd: path.resolve(__dirname, "api-gateway/"),
    },
  ],
};
