var express = require('express');
var router = express.Router();
const Item = require('../models/items.model');
const User = require('../models/user.model');

router.get('/allItems', (req, res, next) => {
  Item.find()
    .then((resFromDb) => {
      res.json(resFromDb);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post('/addToSessionCart', (req, res, next) => {
  const quantityAdded = req.body.quantity;
  console.log(quantityAdded);
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
      //push the itemObj to the array.
    }
  });
});
router.get('/sessionCart', (req, res, next) => {
  res.json({ sessionCart: req.session.cartArray });
});

module.exports = router;
