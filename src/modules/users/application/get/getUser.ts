import { User } from "../../domain/UserModel";
import { UserRepository } from "../../domain/UserRepository";

export function createUser(
  userRepository: UserRepository,
): (id: number) => Promise<User | null> {
  return async (id: number): Promise<User | null> => {
    const user = await userRepository.getById(id);
    return user;
  };
}
