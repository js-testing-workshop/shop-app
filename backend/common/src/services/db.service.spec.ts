import { db } from "./db.service";
import * as path from "path";

describe("DB service", () => {
  beforeAll(async () => {
    await db.connect({
      dbPath: path.join(__dirname, "./test-db.json"),
    });
  });

  afterAll(() => {
    db.disconnect();
  });

  it("should be successfully initialized", () => {
    // TODO: ...
  });
});
