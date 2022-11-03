import express, {Express} from 'express';
import dotenv from 'dotenv';
import https from 'https'
import fs from 'fs'
import db from './db'
import listsRouter from './listsRouter'
import listModel, {IList} from './listModel'
import {upsertList} from './listController'
import * as http from 'http'
import cors from 'cors'

// Connect to the DB, clear out old stuff and pre-populate with test data.
db().then(async () => {
    await listModel.collection.drop()
    await upsertList({
        name: 'List 1', description: 'List 1 description', listItems: [{description: '1:1', isTicked: true}, {description: '1:2', isTicked: false},],
    } as IList as any)
    await upsertList({
        name: 'List 2', description: 'List 2 description', listItems: [{description: '2:1', isTicked: true}, {description: '2:2', isTicked: false},],
    } as IList as any)
}).catch((reason) => console.error(reason))

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const tlsPort = process.env.TLS_PORT;

https.createServer({
    key: fs.readFileSync('tls/key.pem'), cert: fs.readFileSync('tls/cert.pem'),
}, app).listen(tlsPort, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${tlsPort}`);
});

http.createServer(app).listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})

// Handle JSON bodies
app.use(express.json());

// Allow CORS
app.use(cors())

app.use('/lists', listsRouter)
