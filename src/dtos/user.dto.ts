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
