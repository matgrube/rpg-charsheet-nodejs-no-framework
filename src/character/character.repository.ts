import {DatabaseService} from "../utils/services/database.service";
import {CharacterDTO} from "./character.model";
import {QueryResult, QueryResultRow} from "pg";

export class CharacterRepository {
    private databaseService: DatabaseService = new DatabaseService();

    async findAll(): Promise<QueryResult<QueryResultRow>> {
        return this.databaseService.query('SELECT * FROM private.character');
    };

    async findByUserId(userId: string): Promise<QueryResult<QueryResultRow>> {
        return this.databaseService.query(`SELECT * FROM private.character WHERE character.user_id = '${userId}'`);
    };

    async createCharacter(character: CharacterDTO): Promise<void> {
        const { id, name, race, charClass, level, exp, hpCurrent, hpMax, user_id } = character;
        await this.databaseService.query(`INSERT INTO private.character (id, name, race, class, level, exp, hpCurrent, hpMax, user_id) VALUES ('${id}', '${name}', '${race}', '${charClass}', '${level}', '${exp}', '${hpCurrent}', '${hpMax}', '${user_id}')`);
    }
}