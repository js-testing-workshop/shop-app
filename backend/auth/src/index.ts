import * as path from "path";
import app from "./app";
import { db } from "common";

const start = async () => {
  if (!process.env.PORT) {
    throw new Error("PORT must be defined");
  }

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  process.on("unhandledRejection", (error) => {
    console.error("unhandledRejection", error);
  });

  try {
    await db.connect({
      dbPath: path.join(__dirname, "db.json"),
    });
  } catch (error: any) {
    console.error(`Auth server can not connect to DB: ${error.message}`);
  }

  app.listen(process.env.PORT, () => {
    console.log(`Auth Service: Listening on port ${process.env.PORT}`);
  });
};

start();
