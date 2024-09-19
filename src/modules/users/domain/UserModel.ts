export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export type UserDataToRegister = Omit<User, "id" | "createdAt">;

export interface UserDataToAuthenticate {
  username?: string;
  email?: string;
  password: string;
}

export interface UserDataAuthenticated extends Omit<User, "password"> {
  token: string;
}

export interface UserDTO extends Omit<User, "password"> {
  token: string;
}
