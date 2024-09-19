import { User, UserDataToAuthenticate, UserDTO } from "../domain";

export const toUserDTO = (
  user: UserDataToAuthenticate,
  token: string,
): UserDTO => {
  const userWithoutPassword: Partial<User> = { ...user };
  delete userWithoutPassword.password;
  return {
    ...userWithoutPassword,
    token,
  } as UserDTO;
};
