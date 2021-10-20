const express = require('express');

const router = express.Router();
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

/* GET users listing. */
router.post('/signup', (req, res, next) => {
  const { email, passwordUnhashed } = req.body;
  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(passwordUnhashed, salt))
    .then((hashedPassword) => {
      return User.create({
        email,
        passwordHash: hashedPassword,
      });
    })
    .then((userFromDb) => {
      req.session.currentUser = userFromDb;
      res.json({ status: 200 });
    })
    .catch((err) => console.log('something didnt work: ', err));
});

router.post('/login', (req, res, next) => {
  const { email, passwordUnhashed } = req.body;
  User.findOne({ email }).then((userFromDb) => {
    const hash = userFromDb.passwordHash;
    const verifyPassword = bcryptjs.compareSync(passwordUnhashed, hash);

    if (verifyPassword) {
      req.session.currentUser = userFromDb;
      res.json({
        status: 200,
        msg: 'everythings alright, you wonderful hooman!',
      });
    } else {
      res.json({
        status: 500,
        msg: 'you put in the wrong password or email, you ...!',
      });
    }
  });
});

module.exports = router;
