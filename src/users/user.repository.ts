import {DatabaseService} from "../utils/services/database.service";
import {QueryResult, QueryResultRow} from "pg";

const databaseUrl = process.env['DATABASE_URL'] || 'localhost:5432';
const database = process.env.DATABASE_NAME || 'user';

export class UserRepository {
    private databaseService: DatabaseService = new DatabaseService();

    constructor() {
    }
    async getUsers(): Promise<QueryResult<QueryResultRow>> {
        return this.databaseService.query('SELECT * FROM auth.user');
    }

    async createUser(id: string, userName: string, email: string, password: string) {
        await this.databaseService.query(`INSERT INTO auth.user (id, username, email, password) VALUES ('${id}', '${userName}', '${email}', '${password}')`);
    }

}