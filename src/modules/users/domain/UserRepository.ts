import { UserDataCreate } from "./UserDataCreate";
import { User } from "./UserModel";

export interface UserRepository {
  create: (userData: UserDataCreate) => Promise<User>;
  authenticate: (userData: UserDataCreate) => Promise<User>;
  getById: (id: number) => Promise<User | null>;
}
