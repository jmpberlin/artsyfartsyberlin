var express = require('express');
var router = express.Router();
const Item = require('../models/items.model');

router.get('/allItems', (req, res, next) => {
  Item.find()
    .then((resFromDb) => {
      res.json(resFromDb);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/addToCart', (req, res, next) => {
  const quantityAdded = req.body.quantity;
  const item = req.body.item;
  const artNum = req.body.item.articleNumber;

  // if Session Cart is empty : create it!
  if (req.session.cartArray === undefined) {
    req.session.cartArray = [{ item: item, quantity: quantityAdded }];
  }
  // if it exists, check if the article already exists.
  if (req.session.cartArray.length > 0) {
    let indexOfArt = req.session.cartArray.findIndex(
      (e) => e.item.articleNumber === artNum
    );
    //if it already exists, add the quantity to it.
    if (indexOfArt != -1) {
      req.session.cartArray[indexOfArt].quantity += quantityAdded;
    }
    // if it doesnt exist , push the new Item to the Array
    if (indexOfArt === -1) {
      req.session.cartArray.push({ item: item, quantity: quantityAdded });
    }
  }
  res.json({ text: 'this worked out fine' });
});
router.get('/sessionCart', (req, res, next) => {
  console.log(req.session);
  res.json({ sessionCart: req.session.cartArray });
});

module.exports = router;
