const jwt = require('jsonwebtoken');

// JWT_SECRET only to this for testcase
const JWT_SECRET = 'secreteadasdf!@#!@#lkasdjf!@lkjasdflk!@#jalskd;jfasdnfjasdhfjh';

function auth(req, res, next) {
  let token;

  if ( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ) {
    token = req.headers.authorization;

    try {
      req.user = jwt.verify(token, JWT_SECRET);
    }
    catch (err) {
      return res.status(401).json({
        error: {
          msg: 'Failed to authenticate token!'
        }
      });
    }
  }
  else {
    return res.status(401).json({
      error: {
        msg: 'No token!'
      }
    });
  }
  next();
  return;
};

module.exports = {
  auth,
  JWT_SECRET
};
