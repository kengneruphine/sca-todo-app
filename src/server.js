import http from 'http';
import Debug from 'debug';
import app from './app';

const debug = Debug('api:');

const server = http.createServer(app);

app.set('port', 3030);

server.listen(3030);

server.on('listening', () => {
    debug('Server started on http://localhost:3030');
});
