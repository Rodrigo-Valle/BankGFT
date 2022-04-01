import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST_BD,
    port: parseInt(process.env.PORT),
    username: process.env.USERNAME_BD,
    password: process.env.PASSWORD_BD,
    database: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_NAME : process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/database/migration/*{.js,.ts}"],
    subscribers: [],
});





