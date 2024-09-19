import { registerSchema, UserDataToRegister, UserRepository } from "../domain";

export const createUser = async (
  userRepository: UserRepository,
  data: UserDataToRegister,
) => {
  const parsedData = registerSchema.parse(data);

  const newUser: UserDataToRegister = {
    username: parsedData.username,
    email: parsedData.email,
    password: parsedData.password,
  };

  return await userRepository.create(newUser);
};
