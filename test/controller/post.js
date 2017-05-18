const chai = require('chai');
const jwt = require('jsonwebtoken');
const expect = chai.expect;
const request = require('supertest');
const app = require('../../app.js');
const Post = require('../../app/model/Post');
const {JWT_SECRET} = require('../../app/middleware/auth');
const {encrypt, decrypt} = require('../../app/middleware/crypt');

describe('POST /api/post', () => {
  it('it responds with 401 status code if no authorization header', (done) => {
    request(app)
      .post('/api/post')
      .type('json')
      .send('{"title":"Test Case","content":"Test Case API"}')
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
    .post('/api/post')
    .set('Authorization', token)
    .type('json')
    .send('{"title":"TextMustBe16Byte","content":"Test Case API"}')
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

describe('PUT /api/post', () => {
  it('it responds with 201 status code', (done) => {
    const token = jwt.sign({
      id: 1,
    }, JWT_SECRET, { expiresIn: 60*60 });

    const post = new Post();
    post.title = "Test Update Test Case";
    post.content = "Content content";
    post.save();

    const bodyUpdate = {title:"Update",content:"Update Test Case API"};

    request(app)
    .put(`/api/post/${post._id}`)
    .set('Authorization', token)
    .type('json')
    .send(bodyUpdate)
    .expect(201)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body).have.property('payload');

      expect(res.body.payload.title).to.equal(bodyUpdate.title);
      expect(res.body.payload.content).to.equal(bodyUpdate.content);
      done();
    });
  });
});


describe('Delete /api/post', () => {
  it('it responds with 201 status code', (done) => {
    const token = jwt.sign({
      id: 1,
    }, JWT_SECRET, { expiresIn: 60*60 });

    const post = new Post();
    post.title = "Test Update Test Case";
    post.content = "Content content";
    post.save();

    request(app)
    .delete(`/api/post/${post._id}`)
    .set('Authorization', token)
    .expect(204)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      done();
    });
  });
});
