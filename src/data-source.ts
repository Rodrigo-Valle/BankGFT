import { parse } from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./entity/Usuario";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST_BD,
    port: parseInt(process.env.PORT),
    username: process.env.USERNAME_BD,
    password: process.env.PASSWORD_BD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [Usuario],
    migrations: [],
    subscribers: [],
});
