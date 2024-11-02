import {IncomingMessage, ServerResponse} from "node:http";
import {UserRepository} from "./user.repository";
import {randomUUID} from "node:crypto";
import {UserDTO} from "./user.model";
import {bodyParser} from "../utils/bodyParser";
import {UserService} from "./user.service";

export class UserController {
    private userRepository: UserRepository = new UserRepository();
    private userService: UserService = new UserService();

    async getAll (req: IncomingMessage,res: ServerResponse) {
        const users= await this.userRepository.getUsers();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users.rows));
    }

    async createUser (req: IncomingMessage,res: ServerResponse) {
        try {
            const body :UserDTO = JSON.parse(await bodyParser(req));
            const encryptedBody: UserDTO = {...body, password: await this.userService.encryptPassword(body.password), id: randomUUID()}
            await this.userRepository.createUser(encryptedBody.id, encryptedBody.userName, encryptedBody.email, encryptedBody.password);
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(encryptedBody));
        } catch (e) {
            console.error(e);
        }
    }
}