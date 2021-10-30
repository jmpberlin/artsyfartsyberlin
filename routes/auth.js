const express = require('express');

const router = express.Router();
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const Order = require('../models/order.model');
const saltRounds = 10;

/* GET users listing. */
router.post('/signup', (req, res, next) => {
  const { email, passwordUnhashed } = req.body;
  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      res.json({ success: false, error: 'existingEmail' });
    } else {
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
          return userFromDb;
        })
        .then((userFromDb) => {
          // IF YOU CREATE A USER THE CURRENT ORDER WILL BE ASSIGNED TO THE USER
          const cartId = req.session.currentOrder;
          Order.findByIdAndUpdate(cartId, { cartUser: userFromDb._id }).then(
            (resFromDb) => {
              res.json({ success: true, user: userFromDb });
            }
          );
        })
        .catch((err) => console.log('something didnt work: ', err));
    }
  });
});

router.post('/login', (req, res, next) => {
  const { email, passwordUnhashed } = req.body;
  User.findOne({ email })
    .then((userFromDb) => {
      const hash = userFromDb.passwordHash;
      const verifyPassword = bcryptjs.compareSync(passwordUnhashed, hash);

      if (verifyPassword) {
        req.session.currentUser = userFromDb;
        const cartId = req.session.currentOrder;
        // IF YOU LOGIN THE CURRENT ORDER WILL BE ASSIGNED TO THE USER
        Order.findByIdAndUpdate(cartId, { cartUser: userFromDb._id }).then(
          (resFromDb) => {
            res.json({
              success: true,
              msg: 'everythings alright, you wonderful hooman!',
            });
          }
        );
      } else {
        console.log('i ran because email and password are not correct');
        req.session.currentUser = undefined;
        res.json({
          success: false,
          message: 'Email or Password is wrong. Try Again!',
        });
      }
    })
    .catch((err) => {
      res.json({
        success: false,
        message: 'Email or Password is wrong. Try Again!',
      });
      console.log('this is the error: ', err);
    });
});
router.get('/logout', (req, res, next) => {
  req.session.currentUser = undefined;
  res.json({ message: 'user is signed out!' });
});

module.exports = router;
