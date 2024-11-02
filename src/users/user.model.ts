
export type User = {
    userName: string;
    email: string;
    password: string;
}

export type UserDTO = User & {
    id: string;
}
