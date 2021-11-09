var express = require('express');
var router = express.Router();
const Item = require('../models/items.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');

// GET ALL ITEMS FROM THE ITEM DB
router.get('/allItems', (req, res, next) => {
  Item.find()
    .then((resFromDb) => {
      res.json(resFromDb);
    })
    .catch((err) => {
      res.json(err);
    });
});

/// ADD TO DB ORDER ROUTE!!

router.post('/addToOrder', (req, res, next) => {
  const itemId = req.body.item._id;
  const orderId = req.session.currentOrder;
  Order.findOne({ _id: orderId }).then((currentOrder) => {
    let indexOfArt = currentOrder.items.findIndex(
      (e) => e.item.toString() === itemId
    );
    if (indexOfArt === -1) {
      Order.findByIdAndUpdate(
        orderId,
        {
          $push: {
            items: { item: req.body.item._id, quantity: req.body.quantity },
          },
        },
        { new: true }
      ).then((resFromDb) => {
        res.json({
          msg: 'article not existent before. Pushed to the Array',
          success: true,
          cartLength: resFromDb.items.length,
        });
      });
    }
    if (indexOfArt !== -1) {
      Order.findByIdAndUpdate(
        orderId,
        {
          $inc: { [`items.${indexOfArt}.quantity`]: req.body.quantity },
        },
        { new: true }
      ).then((resFromDb) => {
        res.json({
          msg: 'Article existed before, changed the quantity',
          success: true,
          cartLength: resFromDb.items.length,
        });
      });
    }
  });
});

// GET ALL ITEMS OUT OF THE USER ORDER ENTRY IN THE DB!
router.get('/userOrder', (req, res, next) => {
  const orderId = req.session.currentOrder;
  Order.findById(orderId)
    .populate('items.item')
    .then((userOrderFromDb) => {
      res.json(userOrderFromDb);
    });
});

// SET QUANTITY IN THE CART

router.post('/setQuantityOfCartItem', (req, res, next) => {
  const orderId = req.session.currentOrder;
  const newQuan = req.body.obj.quantity;
  const articleId = req.body.obj.item;
  if (newQuan < 0) {
    return;
  }
  Order.findOne({ _id: orderId })
    .then((resFromDb) => {
      const index = resFromDb.items.findIndex(
        (e) => e.item.toString() === articleId
      );
      return index;
    })
    .then((index) => {
      Order.findOneAndUpdate(
        { _id: orderId },
        {
          $set: { [`items.${index}.quantity`]: newQuan },
        }
      ).then((returnValue) => {
        res.json({ message: 'set the new value', success: true });
      });
    });
});

// DELETE ARTICLE FROM ORDER

router.post('/deleteFromCart', (req, res, next) => {
  const orderId = req.session.currentOrder;
  Order.findByIdAndUpdate(
    orderId,
    {
      $pull: { items: { item: req.body.articleId } },
    },
    { new: true }
  ).then((resFromDb) => {
    console.log(resFromDb.items.length);
    res.json({
      msg: 'deleted the Item from the Cart',
      success: true,
      cartLength: resFromDb.items.length,
    });
  });
});

/// FIND ONE ARTICLE TO DISPLAY DETAIL VIEW

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Item.findById(id).then((resFromDb) => {
    res.json({ item: resFromDb });
  });
});
module.exports = router;
