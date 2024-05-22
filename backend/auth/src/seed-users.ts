import fs from "node:fs/promises";
import * as path from "path";
import "dotenv/config";
import { Password } from "./services/password";
import User from "./interfaces/user";

const run = async () => {
  try {
    // read file
    const seedUsersData = await fs.readFile(
      path.join(__dirname, "./seed-users-config.json"),
      "utf8"
    );
    let users: User[] = JSON.parse(seedUsersData).users;

    // encrypt users
    let usersEncoded = await Promise.all(
      users.map(async (user) => {
        // encrypt password
        const hashedPassword = await Password.toHash(user.password);

        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // write file
    await fs.writeFile(
      path.join(__dirname, "./db.json"),
      JSON.stringify({ users: usersEncoded })
    );
  } catch (e) {
    throw Error(e as string);
  }
};

run();
