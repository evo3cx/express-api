const chai = require('chai');
const jwt = require('jsonwebtoken');
const expect = chai.expect;
const request = require('supertest');
const app = require('../../app.js');
const {JWT_SECRET} = require('../../app/middleware/auth');

describe('POST /api/login', () => {
  it('it responds with 401 status code if bad username or password', (done) => {
    request(app)
      .post('/api/login')
      .type('json')
      .send('{"name":"bad","password":"wrong"}')
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('it responds with 200 status code if good name or password', (done) => {
    request(app)
      .post('/api/login')
      .type('json')
      .send('{"name":"demo","password":"password"}')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('it returns JWT token if good username or password', (done) => {
    request(app)
      .post('/api/login')
      .type('json')
      .send('{"name":"demo","password":"password"}')
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).have.property('jwt');

        done();
      });
  });
});


describe('add user, POST /api/user', () => {
  it('it responds with 401 status code if no authorization header', (done) => {
    request(app)
    .post('/api/user')
    .expect(401)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it('it responds with 201 status code if good authorization header', (done) => {
    const token = jwt.sign({
      id: 1,
    }, JWT_SECRET, { expiresIn: 60*60 });
    request(app)
    .post('/api/user')
    .set('Authorization', token)
    .type('json')
    .send('{"name":"demo","password":"password","email":"testcase@mail.com"}')
    .expect(201)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body).have.property('payload');
      done();
    });
  });

});
