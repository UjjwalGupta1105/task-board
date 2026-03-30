export type RegisterUserDto = {
    fullName: string
    email: string
    password: string
    roleId?: number | null
}

export type LoginUserDto = {
    email: string
    password: string
}

export type UserResponse = {
  id: number;
  fullName: string;
  email: string;
  token: string;
};

export type AuthCheckDto = {
    authToken: string;
}