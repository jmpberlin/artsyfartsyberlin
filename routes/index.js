var express = require('express');
var router = express.Router();
const Order = require('../models/order.model');

/* GET home page. */
router.get('/checkuser', function (req, res, next) {
  let sessId = req.sessionID;
  Order.findOne({ cartSession: sessId })
    .then((answerFromDb) => {
      if (answerFromDb === null) {
        Order.create({
          cartSession: sessId,
          paid: false,
          item: [],
          status: 'exploring',
        }).then((resFromDb) => {
          console.log(resFromDb);
          req.session.currentOrder = resFromDb._id;
          req.session.save();
        });
      }
      if (answerFromDb !== null) {
        req.session.currentOrder = answerFromDb._id;
        req.session.save();
      }
    })
    .catch((err) => console.log('there has been an error, ', err));
  if (req.session.currentUser) {
    res.json({ currentUser: req.session.currentUser });
  } else {
    res.json({ currentUser: null });
  }
});

module.exports = router;
