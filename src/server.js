import http from 'http';
import Debug from 'debug';
import app from './app';
import dotenv from 'dotenv';

const debug = Debug('api:');
dotenv.config();

const server = http.createServer(app);
const port = process.env.PORT;

app.set('port', port);

server.listen(port);

server.on('listening', () => {
    debug('Server started on http://localhost:3030');
});
