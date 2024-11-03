import * as http from 'http';
import {IncomingMessage, ServerResponse} from "node:http";
import {UserController} from "./users/user.controller";
import {CharacterController} from "./character/character.controller";

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const userController = new UserController();
    const characterController = new CharacterController();

    if (req.url === '/api/users') {
        if (req.method === 'GET') userController.getAll(req, res);
        if (req.method === 'POST') userController.createUser(req, res);
    }
    else if (req.url === '/api/characters') {
        if (req.method === 'GET') characterController.getAllCharacters(req, res);
        if (req.method === 'POST') characterController.createCharacter(req, res);
    }
    else if (req.url && req.url.match(/\/api\/characters\/.+/)) {
        characterController.getCharactersByUserId(req, res);
    }
    else {
            res.writeHead(404, 'Not Found');
            res.end();
    }
});

const PORT = process.env.PORT || 9001;

server.listen(PORT, () => console.log(`Listening on ${PORT}`));