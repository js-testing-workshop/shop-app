import jwt from "jsonwebtoken";
import * as path from "path";
import { db } from "common";

beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";

  await db.connect({
    dbPath: path.join(__dirname, "./src/db.json"),
  });
});

afterAll(() => {
  db.disconnect();
});

global.signin = () => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: 1,
    email: "foo@bar.com",
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
