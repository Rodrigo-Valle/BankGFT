import express, { Request, Response, Next, Error } from "express";
import morgan from 'morgan';
import * as bodyParser from "body-parser";
import fs from 'fs';
import path from 'path';
import { router } from "./Router/routes";
import cors from 'cors'

const app = express();

app.use(cors());
app.use(bodyParser.json());

if(!fs.existsSync('src/logs')) {
    fs.mkdirSync('src/logs');
}

app.use(morgan('dev', {
    skip: function (req: Request, res: Response) { return res.statusCode < 400 },
    stream: fs.createWriteStream(path.join('src/logs', 'error.log'), { flags: 'a' })
}));

app.use(morgan('combined', {
    skip: function (req: Request, res: Response) { return res.statusCode >= 400 },
    stream: fs.createWriteStream(path.join('src/logs', 'success.log'), { flags: 'a' })
}));

app.use(router);

export { app }