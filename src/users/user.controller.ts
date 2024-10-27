import {IncomingMessage, ServerResponse} from "node:http";

export class UserController {
    async getAll (req: IncomingMessage,res: ServerResponse) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({id: 1, userName: 'John', email: 'john@example.com'}));
    }
}