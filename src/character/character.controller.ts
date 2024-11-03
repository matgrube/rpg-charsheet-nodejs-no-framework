import {CharacterDTO} from "./character.model";
import {IncomingMessage, ServerResponse} from "node:http";
import {bodyParser} from "../utils/bodyParser";
import {CharacterRepository} from "./character.repository";
import {randomUUID} from "node:crypto";


export class CharacterController {
    private characterRepository: CharacterRepository = new CharacterRepository();

    async getAllCharacters(req: IncomingMessage, res: ServerResponse) {
        try {
            const chars = await this.characterRepository.findAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(chars.rows));
        } catch (error) {
            console.error(error);
        }
    }

    async getCharactersByUserId(req: IncomingMessage, res: ServerResponse) {
        try {
            const id = req.url?.split('/')[3] ?? '';
            const chars = (await this.characterRepository.findByUserId(id)).rows;
            if(!chars) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: "No characters for that user" }));
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(chars));
            }
        } catch (error) {
            console.error(error);
        }
    }

    async createCharacter(req: IncomingMessage,res: ServerResponse) {
        try {
            const body: CharacterDTO = {...JSON.parse(await bodyParser(req)), id: randomUUID()};
            await this.characterRepository.createCharacter(body);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(body));
        } catch (error) {
            console.log(error);
        }
    }
}