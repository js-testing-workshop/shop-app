import * as path from "path";
import app from "./app";
import { db } from "common";

const start = async () => {
  const PORT = process.env.PORT;

  if (!PORT) {
    throw new Error("PORT must be defined");
  }

  process.on("unhandledRejection", (error) => {
    console.error("unhandledRejection", error);
  });

  try {
    await db.connect({
      dbPath: path.join(__dirname, "db.json"),
      dbBackupPath: path.join(__dirname, "db.bkp.json"),
    });
  } catch (error: any) {
    console.error(`Product server can not connect to DB: ${error.message}`);
  }

  app.listen(PORT, () => {
    console.info(`Product server is running on port ${PORT}`);
  });
};

start();
