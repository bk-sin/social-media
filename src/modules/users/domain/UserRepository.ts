import {
  User,
  UserDataAuthenticated,
  UserDataToAuthenticate,
  UserDataToRegister,
} from "./UserModel";

export interface UserRepository {
  create: (userData: UserDataToRegister) => Promise<UserDataAuthenticated>;
  authenticate: (
    userData: UserDataToAuthenticate,
  ) => Promise<UserDataAuthenticated>;
  getById: (id: number) => Promise<User | null>;
}
