import bcrypt from 'bcrypt';

export class UserService {
    constructor() {};

    async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    };

    async checkPassword(input: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(input, hash);
    }
}