import fs from "node:fs/promises";
import * as path from "path";

const getId = () => {
  return Math.random().toString(16).slice(2);
};

const wait = (delay: number) => {
  return new Promise((resolve: any) => {
    setTimeout(
      () => {
        return resolve();
      },
      delay * 60 * 1000,
    );
  });
};

class DB {
  #instance?: DB;
  #schema: Array<string> = [];
  #DB_PATH: string = "";
  #DB_BACKUP_PATH: string = "";
  #isConnectionOpen = false;
  #DB_RESET_TIME = 15; // 15 mins

  constructor() {
    // NOTE: Singleton
    if (typeof this.#instance !== "undefined") {
      return this.#instance;
    }

    this.#instance = this;
  }

  runScheduler(delay = 0) {
    const runInterval = async (delay: number) => {
      const isConnected = await this.checkConnection();

      if (!isConnected) {
        return;
      }

      try {
        await wait(delay);
        await this.resetDb();

        runInterval(delay);
      } catch (error) {
        console.error("Something went wrong in DB reset interval", error);
      }
    };

    runInterval(delay);

    console.info(`DB will be reset every ${delay} mins`);
  }

  checkConnection() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.#isConnectionOpen);
      }, 0);
    });
  }

  async resetDb() {
    const content = await fs.readFile(this.#DB_BACKUP_PATH, {
      encoding: "utf8",
    });
    await fs.writeFile(this.#DB_PATH, content, {
      encoding: "utf8",
    });

    console.info("DB was reset", new Date().toISOString());
  }

  disconnect() {
    this.#isConnectionOpen = false;

    console.info("DB disconnected");
  }

  async connect({
    dbPath,
    dbBackupPath = "",
  }: {
    dbPath: string;
    dbBackupPath?: string;
  }) {
    if (this.#isConnectionOpen) {
      console.info(`DB connection already exist`);
      return;
    }

    this.#DB_PATH = dbPath;
    this.#DB_BACKUP_PATH = dbBackupPath;

    const data = await this.readAll();

    for (const item of Object.keys(data)) {
      this.#schema.push(item);
    }

    console.info("Connected to DB");

    if (this.#DB_BACKUP_PATH) this.runScheduler(this.#DB_RESET_TIME);

    this.#isConnectionOpen = true;
  }

  async read(prop: string) {
    if (!this.#schema.includes(prop)) {
      throw new Error(`There is no ${prop} in DB schema`);
    }

    const data = await this.readAll();

    return data[prop];
  }

  async readAll() {
    try {
      const data = await fs.readFile(this.#DB_PATH, { encoding: "utf8" });
      const json = JSON.parse(data);

      return json;
    } catch (error: any) {
      throw new Error(`Cannot read data from db: ${error.message}`);
    }
  }

  async write(prop: string, data: any) {
    if (!this.#schema.includes(prop)) {
      throw new Error(`There is no ${prop} in DB schema`);
    }

    const allRecords = await this.readAll();

    data.id = getId();

    allRecords[prop].unshift(data);

    try {
      const content = JSON.stringify(allRecords);

      await fs.writeFile(this.#DB_PATH, content, {
        encoding: "utf8",
      });

      return data;
    } catch (error: any) {
      throw new Error(`Cannot write data to db: ${error.message}`);
    }
  }
}

const db = new DB();

export { db };
