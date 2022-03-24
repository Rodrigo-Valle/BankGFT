import 'reflect-metadata';
import * as express from "express"
import * as bodyParser from "body-parser"
import { router } from "./Router/routes"
import { AppDataSource } from './data-source';

AppDataSource.initialize()
    .then(() => {
        const app = express();
        app.use(bodyParser.json());
        app.use(router);

        app.listen(3000, () => {
            console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results")
        })
    })
    .catch((e) => console.log(e));


