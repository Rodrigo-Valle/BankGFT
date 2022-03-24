import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./entity/Usuario";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "bank",
    synchronize: true,
    logging: false,
    entities: [Usuario],
    migrations: [],
    subscribers: [],
});
