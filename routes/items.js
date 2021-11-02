var express = require('express');
var router = express.Router();
const Item = require('../models/items.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');

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
      Order.findByIdAndUpdate(orderId, {
        $push: {
          items: { item: req.body.item._id, quantity: req.body.quantity },
        },
      }).then((resFromDb) => {
        //
      });
    }
    if (indexOfArt !== -1) {
      Order.findByIdAndUpdate(orderId, {
        $inc: { [`items.${indexOfArt}.quantity`]: req.body.quantity },
      }).then((resFromDb) => {});
    }
  });
});

// ADD TO SESSION CART BEFORE ORDER MODEL EXISTED // DEPRICATED _ DELETE AFTER A WHILE!

router.post('/addToSessionCart', (req, res, next) => {
  const quantityAdded = req.body.quantity;

  const item = req.body.item;
  const artNum = req.body.item.articleNumber;

  // if it exists, check if the article already exists.
  if (req.session.cartArray !== undefined) {
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
  // if Session Cart is empty : create it!
  if (req.session.cartArray === undefined) {
    req.session.cartArray = [{ item: item, quantity: quantityAdded }];
  }
  res.json({ text: 'this worked out fine' });
});

// ADD TO DB CART - BEFORE ORDER MODEL EXISTED! // DEPRICATED _ DELETE AFter A WHILE!

router.post('/addToDbCart', (req, res, next) => {
  const userId = req.body.currentUser;
  // console.log(req.body);s
  // console.log(req.body.quantity);
  User.findById(userId).then((userFromDb) => {
    // console.log(
    //   'this is the shoppin Carts length:',
    //   userFromDb.shoppingCart.length
    // );

    if (userFromDb.shoppingCart.length > 0) {
      let quantity = req.body.quantity;
      let artNum = req.body.item.articleNumber;
      let artIndex = userFromDb.shoppingCart.findIndex(
        (e) => e.item.articleNumber === artNum
      );
      if (artIndex === -1) {
        console.log(
          'article is not yet in the cart, thats why I am running',
          artIndex
        );
        User.findByIdAndUpdate(userId, {
          $push: {
            shoppingCart: { item: req.body.item, quantity: req.body.quantity },
          },
        }).then((answer) => {
          console.log(
            'this is the answer I got, after pushing on to the array:',
            answer
          );
        });
      } else {
        console.log('The article exists, thats why I am running', artIndex);
        // User.findById(userId).then((userFromDb) => {
        //   console.log(userFromDb.shoppingCart[0].quantity);
        // });
        User.findByIdAndUpdate(userId, {
          $inc: { [`shoppingCart.${artIndex}.quantity`]: req.body.quantity },
        })
          .then((answer) => {
            console.log(
              'this is the answer I got after trying to increase the quantity',
              answer
            );
          })
          .catch((err) => {
            console.log('there was an error,', err);
          });
      }
    } else {
      console.log('the whole cart is empty, that is why I am running');
      User.findByIdAndUpdate(userId, {
        $push: {
          shoppingCart: { item: req.body.item, quantity: req.body.quantity },
        },
      })
        .then((answer) => {
          console.log(answer);
        })
        .catch((err) => console.log(err));
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

// IN THE CART ADD AND DELETE ITEMS : // WORK ON THIS ROUTE TOMORROW!

router.post('/setQuantityOfCartItem', (req, res, next) => {
  console.log('==========>>>>> here comes req.body');
  console.log(req.body);
  const orderId = req.session.currentOrder;
  const newQuan = req.body.obj.quantity;
  const articleId = req.body.obj.item;

  console.log('this is the current Order: ', req.session.currentOrder);
  Order.findOne({ _id: orderId })
    .then((resFromDb) => {
      const index = resFromDb.items.findIndex(
        (e) => e.item.toString() === articleId
      );
      return index;
    })
    .then((index) => {
      Order.findOneAndUpdate(orderId, {
        $set: { [`items.${index}.quantity`]: newQuan },
      }).then((returnValue) => {
        console.log('this is the returnValue from The backend:', returnValue);
        res.json({ message: 'set the new value', sucess: true });
      });
    });
  // FIND THE ARTICLE BY ID AND SET THE QUANTITY TO THE NEW VALUE
  // Order.findOneAndUpdate(orderId, {$set:{"items.item":}});
});

// GET THE SESSION CART _ DEPRECATED _ DELETE AFTER A WHILE
router.get('/sessionCart', (req, res, next) => {
  res.json({ sessionCart: req.session.cartArray });
});

module.exports = router;
