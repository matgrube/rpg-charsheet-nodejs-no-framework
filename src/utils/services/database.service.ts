import pg, {PoolClient, QueryResult, QueryResultRow} from "pg";

const { Pool } = pg;

export class DatabaseService {
    private pool = new Pool({
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: Number(process.env.PGPORT)

    });
    constructor() {
        this.connect();
    }

    async connect(): Promise<PoolClient> {
        return this.pool.connect();
    }

    async query<T extends string>(queryStream: T): Promise<QueryResult<QueryResultRow>> {
        return await this.pool.query(queryStream);
    };

    end(): Promise<void> {
        return this.pool.end();
    }
}