import * as http from 'http';
import {IncomingMessage, ServerResponse} from "node:http";
import {UserController} from "./users/user.controller";

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const userController = new UserController();

    switch (req.url) {
        case '/api/users':
            if(req.method === 'GET') userController.getAll(req, res);
            if(req.method === 'POST') userController.createUser(req, res);
            break;
        default:
            res.writeHead(404, 'Not Found');
            res.end();
    }
});

const PORT = process.env.PORT || 9001;

server.listen(PORT, () => console.log(`Listening on ${PORT}`));