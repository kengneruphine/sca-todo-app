import chai from 'chai';
import chaiHttp from 'chai-http';

import app from './app';

chai.use(chaiHttp);
chai.should();

let request;
beforeEach(() => {
  request = chai.request(app);
});

describe('Root Route', () => {
  it('should display Welcome on root route', async () => {
    const res = await request.get('/');
    res.should.have.status(200);
  });
});