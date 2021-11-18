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

        // OLD ORDER PROMISE
        const alreadyExistentOrder = Order.findOne({
          cartUser: userFromDb._id,
        });

        // NEW ORDER PROMISE
        const newlyCreatedOrder = Order.findOne({ _id: cartId });

        // THIS IS THE MERGE OF OLD AND NEW CART!
        Promise.all([alreadyExistentOrder, newlyCreatedOrder]).then(
          (resFromPromiseAll) => {
            // console.log('ran till here! 1 ');
            // console.log(
            //   'this is the first answer - should be already existing Order: '
            // );
            // console.log(resFromPromiseAll[0]);
            // console.log(
            //   'this is the second Answer - should be the new Order :'
            // );
            // console.log(resFromPromiseAll[1]);
            // console.log(
            //   'this is the log of an Id to see, if it has to be parsed: '
            // );
            // console.log(resFromPromiseAll[0].items[0].item);
            // console.log(resFromPromiseAll[0].items[0].item.toString());

            if (
              resFromPromiseAll[0] === null ||
              resFromPromiseAll[1] === null
            ) {
             
              Order.findByIdAndUpdate(cartId, {
                cartUser: userFromDb._id,
              }).then((resFromDb) => {
                return res.json({
                  success: true,
                  msg: 'everythings alright, you wonderful hooman!',
                });
              });
            }
            if (
              resFromPromiseAll[0] === null ||
              resFromPromiseAll[1] === null
            ) {
              
              return;
            }
            // if (resFromPromiseAll[0]._id === resFromPromiseAll[1]._id) {
            //   return;
            // }
            // console.log('ran till here 2');
            const newArr = [];
            resFromPromiseAll[1].items.forEach((article) => {
              let articleId = article.item.toString();
              let index = resFromPromiseAll[0].items.findIndex(
                (article) => article.item.toString() === articleId
              );
              if (index === -1) {
                newArr.push(article);
              }
            });
            // console.log('ran till here 3');
            if (newArr.length > 0) {
              Order.findByIdAndUpdate(
                resFromPromiseAll[0]._id,
                {
                  $push: {
                    items: newArr,
                  },
                },
                { new: true }
              )
                .then((updatedOrder) => {
                  // console.log('ran till here 4');
                  return updatedOrder;
                })
                .then((updatedOrder) => {
                  req.session.currentOrder = updatedOrder._id;
                  // console.log('ran till here!');
                  Order.findByIdAndDelete(cartId).then((resFromDB) => {
                    res.json({
                      success: true,
                      msg: 'everythings alright, you wonderful hooman!',
                    });
                  });
                });
            } else {
              req.session.currentOrder = resFromPromiseAll[0]._id;
              Order.findByIdAndDelete(cartId).then((resFromDB) => {
                res.json({
                  success: true,
                  msg: 'everythings alright, you wonderful hooman!',
                });
              });
            }
          }
        );
        //
      } else {
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
  Order.findByIdAndUpdate(req.session.currentOrder, {
    cartSession: null,
  }).then((resFromDb) => {
    req.session.currentUser = undefined;
    req.session.currentOrder = undefined;
    req.session.save();
    const sessId = req.sessionID;
    Order.create({
      cartSession: sessId,
      paid: false,
      item: [],
      status: 'exploring',
    }).then((resFromDb) => {
      req.session.currentOrder = resFromDb._id;
      req.session.save();
      res.json({ message: 'user is signed out!' });
    });
  });
});

module.exports = router;
