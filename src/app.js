import express, { json, urlencoded } from 'express';
import cors from 'cors'
import morgan from 'morgan'
import db from './database';

import authRoute from './routes/auth';
import listRoute from './routes/list';

const app = express();

//call the database connectivity function
db();

app.use(cors());
app.use(morgan('dev'))
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/user', authRoute);
app.use('/api/list', listRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app
