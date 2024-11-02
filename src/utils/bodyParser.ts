import {IncomingMessage} from "node:http";

export function bodyParser(req: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                resolve(body);
            });
        } catch (e) {
            reject(e);
        }
    });
}