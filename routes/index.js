var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/checkuser', function (req, res, next) {
  console.log('this worked!');
  res.json({ text: 'Hola from the Backendos' });
});

module.exports = router;
