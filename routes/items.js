var express = require('express');
var router = express.Router();
const Item = require('../models/items.model');

router.get('/allItems', (req, res, next) => {
  Item.find()
    .then((resFromDb) => {
      console.log(resFromDb);
      res.json(resFromDb);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
