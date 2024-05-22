import * as path from "path";
import { db } from "common";

beforeAll(async () => {
  await db.connect({
    dbPath: path.join(__dirname, "./src/db.json"),
  });
  global.currentUser = {
    id: 1,
    email: global.userEmail,
  };
});

afterAll(() => {
  db.disconnect();
});
