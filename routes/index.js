var express = require('express');
var router = express.Router();
const Order = require('../models/order.model');
const User = require('../models/user.model');

/* GET home page. */

router.get('/checkForOrder', function (req, res, next) {
  let sessId = req.sessionID;

  // CHECK IF USER IS LOGGED IN
  if (req.session.currentUser) {
    Order.findOne({ cartUser: req.session.currentUser._id }).then(
      (resFromDb) => {
        req.session.currentOrder = resFromDb._id;
        req.session.save();
        res.json({ currentUser: req.session.currentUser });
      }
    );
  }

  // IF USER IS NOT LOGGED IN, CHECK FOR AN EXISTING ORDER
  if (!req.session.currentUser) {
    Order.findOne({ cartSession: sessId })
      .then((answerFromDb) => {
        if (answerFromDb === null) {
          Order.create({
            cartSession: sessId,
            paid: false,
            item: [],
            status: 'exploring',
          }).then((resFromDb) => {
            req.session.currentOrder = resFromDb._id;
            req.session.save();
            res.json({ currentUser: null });
          });
        } else {
          req.session.currentOrder = answerFromDb._id;
          req.session.save();
          res.json({ currentUser: null });
        }
      })
      .catch((err) => console.log('there has been an error, ', err));
  }
});

router.get('/isUserLoggedIn', (req, res, next) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id)
      .then((userFromDb) => {
        res.json({ loggedIn: true, user: userFromDb });
      })
      .catch((err) =>
        console.log('there was an error in the isLoggedIn-Route ', err)
      );
  }
  if (!req.session.currentUser) {
    res.json({ loggedIn: false, user: null });
  }
});

module.exports = router;
