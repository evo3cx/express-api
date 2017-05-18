const { Router } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Post = require('../model/Post');
const {AESencrypt} = require('../middleware/crypt');
const {auth,JWT_SECRET} = require('../middleware/auth');

// create our router
const router = Router();


router.post('/login',(req, res) => {
  const user = new User();		// create a new instance of the Bear model
  user.name = req.body.name;
  user.password = req.body.password;

  //Login for test
  if (user.name ==='demo' && user.password === 'password'){
    res.json({
      id: 1,
      username: 'demo',
      jwt: jwt.sign({
        id: 1,
      }, JWT_SECRET, { expiresIn: 60*60 })
    });
    return;
  }

  res.status(401).json({
    error: {
      message: 'Wrong name or password!'
    }
  });
});

router.get('/user/:id',auth,(req, res) => {
  User.find((err, user) => {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ payload: user });
  });
});

router.post('/user', auth, (req, res) => {
  const user = new User();		// create a new instance of the Bear model
  user.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save((err) => {
    if (err)      {
      res.status(403).send(err);
      return;
    }
    res.status(201).json({ payload: user });
  });
});

router.post('/post', auth, (req, res) => {
  const post = new Post();		// create a new instance of the Bear model
  post.title = req.body.title;
  post.content = req.body.content;

  post.save((err) => {
    if (err)      {
      res.status(403).send(err);
      return;
    }
    post.title = AESencrypt(post.title);
    const payload = post;
    res.status(201).json({ payload });
  });
});

router.put('/post/:id', auth, (req, res) => {
  Post.findOne({_id:req.params.id}, (err,post) => {
    if (err){
      return res.json({error: 'user ini tidak memiliki theme'});
    }

    post.title = req.body.title;
    post.content = req.body.content;

    post.save((err) => {
      if (err)      {
        res.status(403).send(err);
        return;
      }
      res.status(201).json({ payload: post });
    });
  });

});

router.delete('/post/:id', auth, (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err) => {
    if (err)      {
      res.status(403).send(err);
      return;
    }
    res.status(204).json({});
  });
});

module.exports = router;
