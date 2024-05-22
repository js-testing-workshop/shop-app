import path from "node:path";
import { fileURLToPath } from "node:url";
import concurrently from "concurrently";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const run = (command = "") => {
  const { result } = concurrently(
    [
      {
        command,
        name: "auth server",
        cwd: path.resolve(__dirname, "auth"),
      },
      {
        command,
        name: "payments server",
        cwd: path.resolve(__dirname, "payments"),
      },
      {
        command,
        name: "shop server",
        cwd: path.resolve(__dirname, "shop"),
      },
      {
        command,
        name: "api-gateway server",
        cwd: path.resolve(__dirname, "api-gateway"),
      },
    ],
    {
      prefix: "name",
      restartTries: 3,
    },
  );

  return result;
};

// TODO: add logging to success and error callbacks
run("npm start")
  .then(
    (...props) => {
      console.log("success", props);
    },
    (...props) => {
      console.log("error", props);
    },
  )
  .catch((...props) => {
    console.log("error", props);
  });
