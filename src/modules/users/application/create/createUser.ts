import { UserDataCreate } from "../../domain/UserDataCreate";
import { User } from "../../domain/UserModel";
import { UserRepository } from "../../domain/UserRepository";

export function createUser(
  userRepository: UserRepository,
): (userData: UserDataCreate) => Promise<User> {
  return async (userData: UserDataCreate): Promise<User> => {
    const createdUser = await userRepository.create(userData);
    return createdUser;
  };
}
