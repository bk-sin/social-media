import { loginSchema, UserDataToAuthenticate, UserRepository } from "../domain";

export const authenticate = async (
  userRepository: UserRepository,
  data: UserDataToAuthenticate,
) => {
  const parsedData = loginSchema.parse(data);

  const userData: UserDataToAuthenticate = {
    username: parsedData?.username,
    password: parsedData.password,
  };

  return await userRepository.authenticate(userData);
};
