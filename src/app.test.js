import chai from 'chai';
import chaiHttp from 'chai-http';

import app from './app';

chai.use(chaiHttp); //setup chai to use chai-http for requesting our application server
chai.should();

let request;
beforeEach(() => {
  request = chai.request(app);
});

describe('Root Route', () => {
  it('should display Welcome on root route', async () => {
    const res = await request.get('/'); //requesting our application with a get request on '/'
    res.should.have.status(200);
  });
});
