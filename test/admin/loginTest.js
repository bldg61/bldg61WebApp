const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');

describe('Admin path', async () => {
  it('allows users to login', async () => {
    const res = await request(app)
      .get('/admin')
      .redirects()
      .expect(200);

    expect(res.err).to.be.undefined; // eslint-disable-line no-unused-expressions
    expect(res.text).to.include('Login');
    expect(res.text).to.include('Email');
    expect(res.text).to.include('Password');
    expect(res.text).to.include('Login');
  });
});
