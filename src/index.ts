import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from './data-source';
import { app } from './app';

AppDataSource.initialize().then(() => {
    console.log("DataSource initialized");
}).catch((e) => {
    console.log(e);
})

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Express server has started on port ${port} . Open http://localhost:${port}/ to see results`)
})