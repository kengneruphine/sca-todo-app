import express, { json, urlencoded } from 'express';
import cors from 'cors'
import morgan from 'morgan'
import db from './database';

import apiRouter from './routes/index'

const app = express();

//call the database connectivity function
db();

app.use(cors());
app.use(morgan('dev'))
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app
