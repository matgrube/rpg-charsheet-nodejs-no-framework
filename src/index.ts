import * as http from 'http';
import {IncomingMessage, ServerResponse} from "node:http";
import {UserController} from "./users/user.controller";

const controllers = {
    user: UserController
}

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    switch (req.url) {
        case '/api/users':
            new controllers.user().getAll(req, res);
        default:
            res.writeHead(404, 'Not Found');
            res.end();
    }
});

const PORT = process.env.PORT || 9001;

server.listen(PORT, () => console.log(`Listening on ${PORT}`));