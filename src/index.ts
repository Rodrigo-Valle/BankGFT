import 'reflect-metadata';
import 'dotenv/config';
import { AppDataSource } from './data-source';
import { app } from './app';

const port = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
    console.log("DataSource initialized");
    app.listen(port, () => {
        console.log(`Express server has started on port ${port} . Open http://localhost:${port}/ to see results`)
    })
}).catch((e) => {
    console.log(e);
});

