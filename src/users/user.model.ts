
export type User = {
    userName: string;
    email: string;
    password: string;
}

export type UserDTO = User & {
    id: number;
}

export class UserModel {
    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }
    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
    constructor(id: number, userName: string, email: string, password: string) {
        this._id = id;
        this._email = email;
        this._userName = userName;
        this.password = password;
    }

    private _id: number;
    private _email: string;
    private _userName: string;
    private password: string;


}