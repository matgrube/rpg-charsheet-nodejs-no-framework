import {IncomingMessage, ServerResponse} from "node:http";
import {UserRepository} from "./user.repository";
import {randomUUID} from "node:crypto";
import {UserDTO} from "./user.model";
import {bodyParser} from "../utils/bodyParser";

export class UserController {
    private userRepository: UserRepository = new UserRepository();

    async getAll (req: IncomingMessage,res: ServerResponse) {
        const users= await this.userRepository.getUsers();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users.rows));
    }

    async createUser (req: IncomingMessage,res: ServerResponse) {
        try {
            const body = await bodyParser(req);
            const bodyObject: UserDTO = JSON.parse(body);
            await this.userRepository.createUser(randomUUID(), bodyObject.userName, bodyObject.email, bodyObject.password);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(bodyObject));
        } catch (e) {
            console.error(e);
        }
    }
}