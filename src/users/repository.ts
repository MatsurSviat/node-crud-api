import { v4 as uuidv4 } from "uuid";
import ApiError from "../apiError/apiError";
import { Deleted, IUserRepository, User } from "./types";
import { getIdNotFoundMessage } from "../apiError/errorMessages";

export class UserRepository implements IUserRepository {
  constructor(private users: User[]) {}

  async getAll(): Promise<User[]> {
    return new Promise((resolve) => {
      resolve(this.users);
    });
  }

  async getOne(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.id === id);
      if (user) {
        resolve(user);
      }
      reject(ApiError.notFound(getIdNotFoundMessage(id)));
    });
  }

  async create(user: User): Promise<User> {
    return new Promise((resolve) => {
      const newUser = { ...user, id: uuidv4() };
      this.users.push(newUser);
      resolve(newUser);
    });
  }

  async delete(id: string): Promise<Deleted> {
    return new Promise((resolve, reject) => {
      const candidate = this.users.find((user) => user.id === id);
      if (candidate) {
        this.users.splice(this.users.indexOf(candidate), 1);
        resolve("deleted");
      } else {
        reject(ApiError.notFound(getIdNotFoundMessage(id)));
      }
    });
  }

  async update(id: string, user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      const candidate = this.users.find((user) => user.id === id);
      if (!candidate) {
        reject(ApiError.notFound(getIdNotFoundMessage(id)));
      }
      const updatedUser = { ...user, id };
      this.users.splice(this.users.indexOf(candidate), 1, updatedUser);
      resolve(updatedUser);
    });
  }
}
