import { db } from "common";
import UserI from "../interfaces/user";

class UsersRepo {
  async getUsers() {
    const users: UserI[] = await db.read("users");

    return { users };
  }
}

const usersRepo = new UsersRepo();

export default usersRepo;
