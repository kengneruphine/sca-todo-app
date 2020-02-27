import express, { json, urlencoded } from 'express';
import cors from 'cors'
import morgan from 'morgan'

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app