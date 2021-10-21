var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/checkuser', function (req, res, next) {
  if (req.session.currentUser) {
    res.json({ currentUser: req.session.currentUser });
  } else {
    res.json({ currentUser: undefined });
  }
});

module.exports = router;
